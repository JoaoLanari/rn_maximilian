import { SET_PLACES, REMOVE_PLACES } from './actionTypes'
import { uiStartLoading, uiStopLoading, authGetToken } from './index'

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token fonden!")
      })   
      .then(token => {
        authToken = token
        dispatch(uiStartLoading())
        return  fetch('https://us-central1-awsome-places-1528914851061.cloudfunctions.net/storeImage?auth=', {
          method: 'POST',
          body: JSON.stringify({
            image: image.base64
          }),
          headers: {
            "Authorization": "Bearer " + authToken
          }
        })
      })    
      .then(res => res.json())
      .then(parseRes => {
        const placeData = {
          name: placeName,
          location: location,
          image: parseRes.imageUrl
        }
        return fetch('https://awsome-places-1528914851061.firebaseio.com/places.json?auth=' + authToken, {
          method: 'POST',
          body: JSON.stringify(placeData)
        })
          .then(res => res.json())
          .then(parseRes => {
            console.log(parseRes)
            dispatch(getPlaces())
            dispatch(uiStopLoading())
          })
          .catch(err => {
            console.log(err)
            alert('Something went wrong, please try again!')            
            dispatch(uiStopLoading())
          })

      })
      .catch(err => {
        console.log(err)
        alert('Something went wrong, please try again!')
        dispatch(uiStopLoading())
      })
  }
}

export const getPlaces = () => {
  return (dispatch) => {
    dispatch(authGetToken())
      .then(token => {
        return fetch('https://awsome-places-1528914851061.firebaseio.com/places.json?auth=' + token)
      })
      .catch(() => {
        alert("No valid token fonden!")
      })   
      .then(res => res.json())
      .then(parseRes => {
        const places = []
        for (let key in parseRes) {
          places.push({
            ...parseRes[key],
            image: {
              uri: parseRes[key].image
            },
            key: key
          })
        }
        dispatch(setPlaces(places))
      })
      .catch(err => {
        console.log(err)
        alert('Something went wrong, please try again!')
      })
  }
}

const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  }
}

export const deletePlace = (key) => {
  return dispatch => {
    
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token fonden!")
      })   
      .then(token => {
        dispatch(removePlace(key))
        return fetch('https://awsome-places-1528914851061.firebaseio.com/places/' + key + '.json?auth=' + token, {
          method: 'DELETE'
        })
      })
      .then(res => res.json())
      .then(parseRes => {
        console.log('Done!')
      })
      .catch(err => {
        console.log(err)
        alert('Something went wrong, please try again!')
      })
  }
}

const removePlace = key => {
  return {
    type: REMOVE_PLACES,
    key: key
  }
}

