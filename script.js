const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');

getFromLocalStorage();
calculateTotal();
        //*sayfa bu işlemleri ilk önce yapsın diye fonksiyonları burada çağırıyoruz.

const seats = document.querySelectorAll('.seat:not(.reserved)');
        //* ayırtılan koltukların dışındaki bütün koltuk bilgilerini alırız.


container.addEventListener('click', function(e){
        //* e parametresini hangi elemana tıkladığımızı göstermek için tanımladık
            // console.log(e.target);

    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
            //* eğer yazdığımız değer true ise class'ı seat içeren elemana tıkladığımızda konsola sadece o elemanı yazar. ve  classında reserved ı içerenleri almaz.
            //* başka yere basarsak konsola yazmaz.
        }

        e.target.classList.toggle('selected');
            //* elemana önceden tıklanmadıysa seçer, tıklandıysa siler ve class değerini (selected kısmı) de siler.
            
        calculateTotal();
            //* sadece koltuklara tıkladığımızda hesaplamayı yapar.

    

});

select.addEventListener('change', function(e){
    //* başka bir filmi seçtiğimizde bilgiler yenisiyle değişsin diye event listener ekledik.

    calculateTotal();
        //* bir koltuk seçmek veya filmleri değiştirmek istediğimiz için bu fonksiyonu çağırmamız gerekir.
});


function calculateTotal(){
    const selectedSeats = container.querySelectorAll('.seat.selected')
            //* seçilen koltukları class'ı seat ve selected olan elemanlar olarak tanımladık
    
    const selectedSeatArr = [];
        //* seçilen koltukların dizisi
    const seatsArr = [];
        //* tüm koltukların dizisi

    //* map metodunu bütün koltuklar içinde hangi indexli koltuğu seçtiğimizi göstermek için kullanacağız.
    //* ama şu an koltuklar bizde nodeList olarak görünüyor ve biz map metoduna nodeList'den ulaşamayacağımız için dizi üzerinden kullanacağız.

    selectedSeats.forEach(function(seat){
            selectedSeatArr.push(seat);
                //* seçilen koltukların bilgisini dizinin içine attık.
    });

    seats.forEach(function(seat){
            seatsArr.push(seat)
                //* seçilen koltukların bilgisini dizinin içine attık.
    });

    let selectedSeatIndexs = selectedSeatArr.map(function(seat){
            return seatsArr.indexOf(seat)
                //* tüm koltukların içinden seçtiğimiz koltuğun indexini gösterir.
    });

    console.log(selectedSeatIndexs);
    

    let selectedSeatCount = selectedSeats.length
            //* elemanların kaç tane olduğunu 
    
            //* movie içindeki bilgiyi alıp fiyat dedik (20,25...)
    count.innerText = selectedSeatCount;
            //* sayıyının textine ulaşıp seçilen koltuk sayısı olarak tanımlayıp kaç tane koltuk seçtiğimizi göstermiş olduk.
    amount.innerText = selectedSeatCount * select.value;
            //* seçilen koltuk sayısıyla beraber selecet.value (movie'lerin içindeki fiyat bilgisi) ile çarpıp bilet fiyatını elde ettik
    saveToLocalStorage(selectedSeatIndexs);
}



//** SAVING TO LOCAL STORAGE */


function saveToLocalStorage(indexs){
        localStorage.setItem('selectedSeats', JSON.stringify(indexs))
                //* seçtiğimiz koltukların index numarasını selectedSeats olarak local  storage'e yazar.
        localStorage.setItem('selectedMovieIndex', select.selectedIndex)
                //* seçtiğimiz filmin indexini ls'e yazar.
}


//** SAVING SELECTED ELEMENTS */
        //* sayfayı yenilesek bile bilgilerin ekranda görünmeye devam etmesi için bu adımları uygularız.

function getFromLocalStorage(){
        const selectedSeats = JSON.parse(localStorage.getItem('selectedItems'));
                //* selectedItems olarak gönderdiğimiz bilgiyi ls'den alıyoruz.
        if(selectedSeats !=null && selectedSeats.length > 0){
                //* null değil ve boş bir dizi değilse
                seats.forEach(function(seat, index){
                        if (selectedSeatSeats.indexOf(index) > -1){
                                seat.classList.add('selected')
                        }
                })
        }


        const selectedMovieIndex = localStorage.getItem(selectedMovieIndex);

        if(selectedMovieIndex != null){
              select.selectedIndex = selectedMovieIndex;
                //* hiçbir film seçilmemiş değil ise seçtiğimiz filmin index'ini ls'den alırız.
        }
}
