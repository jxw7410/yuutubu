export const convertErrorMessageToObject = errors =>{
    const errorsObj = {};
    let key;
    errors.forEach( error => {
        key = error.split(" ")[0];
        errorsObj[key] = error
    });
    return errorsObj;
}


//Snippet per tylermcgnnis.com         
export const isEmailValid = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}



export const getVideosForChannel = (videos, keys = []) => {
    const vidArray = [];
    keys.forEach(key => {
        if (videos[key.id])
            vidArray.push(videos[key.id])
    });
    return vidArray;
}

export const sortByViews = arrayOfVids => {
    if (arrayOfVids.length <= 1) return arrayOfVids
    
    const pivot = arrayOfVids[0];
    const leftSide = arrayOfVids.slice(1).filter( obj => {
        if( obj.views > pivot.views) return obj
    });

    const rightSide = arrayOfVids.slice(1).filter(obj => {
        if (obj.views <= pivot.views) return obj
    });

    return sortByViews(leftSide).concat([pivot]).concat(sortByViews(rightSide))

}


export const getChannelVideos = (channel_id, arrayOfVids) => {
    if (!channel_id) return [];

    return arrayOfVids.filter(video => {
        if (video.channel_id === channel_id)
            return video
    });
}

export const convertDurationToTime = duration => {
    /*
        373 -> 6:13
     */
    const hours = Math.floor(duration / 360);
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    if (hours === 0) {
        return `${minutes}:${seconds > 9 ? seconds : `0${seconds}`}`
    } else {
        return `${hours}:${minutes > 9 ? minutes : `0${minutes}`} : ${seconds > 9 ? seconds : `0${seconds}`}`
    }
}

export const filterSearchModalResults = (histories, searches) => {
    const res = {};
    const ref = {};
    histories.forEach( history => {
        res[history.context] = history;     
        ref[history.context.replace(/([.,\/#!?$%\^&\*;:{}=\-_`~()\]\[])+$/g, "")] = 1;   
    });
    
    searches.forEach( search => {
        const word = search.title.toLowerCase().replace(/([.,\/#!?$%\^&\*;:{}=\-_`~()\]\[])+$/g, "");
        //
        if (!ref[word])
            res[word] = { "context" : word};
    });

    return Object.values(res);
}