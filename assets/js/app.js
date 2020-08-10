//variables
const listaTweets = document.getElementById('lista-tweets');

//event Listeners
eventListeners();

function eventListeners(){
    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTweets);

    //borrar tweets
    listaTweets.addEventListener('click',borrarTweet);

    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo)
}

//funciones

//Añadir tweet del formulario
function agregarTweets(e){
    e.preventDefault();
    //leer el valor de la textarea
    const tweet = document.getElementById('tweet').value;

    //crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //creaer elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;

    //añade el boton de borrar el tweet
    li.appendChild(botonBorrar);

    //Añade el tweet a la lista
    listaTweets.appendChild(li);

    //añadir en local Storage
    agregarTweetLocalStorage(tweet);


}


//Eliminar el tweet del DOM
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
        
        }
}

//mostrar datos de storage en la lista
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){
            //crear boton de eliminar
            const botonBorrar = document.createElement('a');
            botonBorrar.classList = 'borrar-tweet';
            botonBorrar.innerText = 'X';

            //creaer elemento y añadirle el contenido a la lista
            const li = document.createElement('li');
            li.innerText = tweet;

            //añade el boton de borrar el tweet
            li.appendChild(botonBorrar);

            //Añade el tweet a la lista
            listaTweets.appendChild(li);        
    });

}
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    //añadir el nuevo tweet
    tweets.push(tweet);

    //convertir de string a arreglo para local storage
    localStorage.setItem('tweets',JSON.stringify(tweets))

}
//Comprobar que haya elementos en el local Storage 
function obtenerTweetsLocalStorage(){
    let tweets;
    //Revisamos los valores del local storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;

    //eliminar la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length -1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets))
}