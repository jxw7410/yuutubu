export const convertDurationToTime = duration => {
    /*
        373 -> 6:13
     */
    const hours = Math.floor( duration / 360);
    const minutes = Math.floor( duration / 60);
    const seconds = Math.floor( duration % 60 );
    
    if( hours === 0){
        return `${minutes}:${ seconds > 9 ? seconds : `0${seconds}`}`
    }else{
        return `${hours}:${minutes > 9 ? minutes : `0${minutes}`} : ${seconds > 9 ? seconds : `0${seconds}`}`
    }
}