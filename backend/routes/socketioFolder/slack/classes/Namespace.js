class Namespace{
    constructor(id, nsTitle, img, endpoint, parkObjectid, parkSystemid, parkGISprop, parkDept, parkParentid, parkCommunityBoard, parkCouncilDistrict, parkPrecinct, parkZipcode, parkBorough, parkAreaType, parkName, parkSeating, parkSurface, parkShape, parkStatus){
        this.id=id;
        this.img=img;
        this.nsTitle=nsTitle;
        //the endpoint refers to the URL link to where the user clicks
        this.endpoint=endpoint;
        //below is data retrieved from NYC Open Data axios request 
        this.parkObjectid=parkObjectid;
        this.parkSystemid=parkSystemid;
        this.parkGISprop=parkGISprop;
        this.parkDept=parkDept;
        this.parkParentid=parkParentid;
        this.parkCommunityBoard=parkCommunityBoard;
        this.parkCouncilDistrict=parkCouncilDistrict;
        this.parkPrecinct=parkPrecinct;
        this.parkZipcode=parkZipcode;
        this.parkBorough=parkBorough;
        this.parkAreaType=parkAreaType;
        this.parkName=parkName;
        this.parkSeating=parkSeating;
        this.parkSurface=parkSurface;
        //parkShape contains an object with two key/value pairs: (i) type/'multiPolygon' and (ii) coordinates/[[Array]]
        this.parkShape=parkShape;
        this.parkStatus=parkStatus;
        this.rooms = [];
    }

    addRoom(roomObj){
        this.rooms.push(roomObj);
    }
}

  module.exports = Namespace;