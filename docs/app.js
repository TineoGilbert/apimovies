let page = 1;
const btnNext = document.getElementById('btnNext');
const btnPrevious = document.getElementById('btnPrevious');


btnNext.addEventListener('click', ()=>{
    if(page < 1000){

        page += 1;
        bringMovies();
    };
});


btnPrevious.addEventListener('click', ()=>{
    if(page > 1){

        page -= 1;
        bringMovies();
    };
});

const bringMovies = async ()=>{

    try{
        
        //Please use your own APIKEY here//

        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=320a0dbd2a0890f2eb08badd9e5e80f3&page=${page}`);
        console.log(res);

        if(res.status === 200){
            const data = await res.json();
            let movies = '';
            data.results.forEach(movie =>{
                movies = movies + `
                
                <div class="pelicula">
                  <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                </div>
                
                <h3 class="titulo">${movie.title}</h3>`
            });

            document.getElementById('contenedor').innerHTML = movies;

        } else if(res.status === 401){
            console.log('Error! Wrong Key');
        } else if(res.status === 404){
            console.log('Not Found');
        } else{
            console.log('we dont know what happened');
        }

    }
    
    catch(error){
        console.log(error);
    }
    
}

bringMovies();
