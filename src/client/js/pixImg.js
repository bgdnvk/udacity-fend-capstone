//gets IMG from API
async function getPixImg(destination){
    //not sure id need async here
    await pixImgData(`/locationimg?countryname=${destination.toLowerCase()}`);
};
const pixImgData = async(url = '')=>{
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.totalHits !== 0){
                document.getElementById("nopicture").innerHTML = ''
                document.getElementById("piximage").src = data.hits[0].largeImageURL;
                return data;
            }else{
                document.getElementById("piximage").src = 'https://cdn.pixabay.com/photo/2013/07/18/10/56/railroad-tracks-163518_960_720.jpg';
                document.getElementById("nopicture").innerHTML = 'Picture not available for this destination :('
                }
        })
        .catch(e => console.log('error inside pixImg'+e));

};

export { getPixImg }