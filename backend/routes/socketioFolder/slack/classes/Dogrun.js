class Dogrun {
  constructor(
    parkName,
    parkShape,
    parkObjectid,
    parkSystemid,
    parkGISprop,
    parkDept,
    parkParentid,
    parkCommunityBoard,
    parkCouncilDistrict,
    parkPrecinct,
    parkZipcode,
    parkBorough,
    parkAreaType,
    parkSeating,
    parkSurface,
    parkStatus
  ) {
    this.parkName = parkName;
    this.parkShape = parkShape;
    this.parkObjectid = parkObjectid;
    this.parkSystemid = parkSystemid;
    this.parkGISprop = parkGISprop;
    this.parkDept = parkDept;
    this.parkParentid = parkParentid;
    this.parkCommunityBoard = parkCommunityBoard;
    this.parkCouncilDistrict = parkCouncilDistrict;
    this.parkPrecinct = parkPrecinct;
    this.parkZipcode = parkZipcode;
    this.parkBorough = parkBorough;
    this.parkAreaType = parkAreaType;
    this.parkSeating = parkSeating;
    this.parkSurface = parkSurface;
    this.parkStatus = parkStatus;
  }
}

// {
//     objectid: '290',
//     system: 'M108Q1-DOGAREA0036',
//     the_geom: [Object],
//     gispropnum: 'M108Q1',
//     department: 'M-15',
//     parentid: 'M108T-ZN05',
//     communityb: '108',
//     councildis: '5',
//     precinct: '19',
//     zipcode: '10065',
//     borough: 'M',
//     dog_area_t: 'Dog Run',
//     name: 'Andrew Haswell Green Dog Run',
//     seating: 'Yes',
//     featuresta: 'Active'
//   }

module.exports = Room;
