
export function addAd(title, text, adid, userid) {
    return {type: 'ADD_AD', title: title, text: text, adid: adid, userid: userid};
  }
  export function showAll() {
    return {type: 'SHOW_ALL'};
  }
  export function deleteAd(id) {
    return {type: 'DELETE_AD', id: id};
  }