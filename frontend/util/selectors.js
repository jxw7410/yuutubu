export const convertErrorMessageToObject = errors => {
  const errorsObj = {};
  let key;
  errors.forEach(error => {
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
  const leftSide = arrayOfVids.slice(1).filter(obj => {
    if (obj.views > pivot.views) return obj
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
  histories.forEach(history => {
    res[history.context] = history;
    ref[history.context.replace(/([.,\/#!?$%\^&\*;:{}=\-_`~()\]\[])+$/g, "")] = 1;
  });

  searches.forEach(search => {
    const title = search.title.toLowerCase().replace(/([.,\/#!?$%\^&\*;:{}=\-_`~()\]\[])+$/g, "");
    const name = search.name.toLowerCase();
    if (!ref[title])
      res[title] = { "context": title };

    if (!ref[name])
      res[name] = { "context": name };
  });

  return Object.values(res);
}

export const filterByWords = (target, arrayOfWords) => {
  const newTarget = target.toLowerCase()
  const matchingWords = [];
  arrayOfWords.forEach(word => {
    if (word.context.startsWith(newTarget))
      matchingWords.push(word)
  })
  return matchingWords;
}

export const filterSubscriptions = (channel_id, subscriptions) => {
  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].channel_id === channel_id)
      return { sub_id: subscriptions[i].id }
  }
  return { sub_id: null }
}

export const capitalize = str => {
  return str[0].toUpperCase() + str.slice(1, str.length);
}


export function debouncer(callback, delay) {
  let debounce;
  return () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      callback(arguments);
    }, delay)
  }
}