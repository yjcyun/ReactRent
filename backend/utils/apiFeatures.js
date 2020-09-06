class APIFeatures {
  constructor(query, queryString) {
    this.query = query,
      this.queryString = queryString
  };

  // FILTER DATA  ex. ?city=toronto&realtor=james
  filter() {
    const queryObj = { ...this.queryString }; //req.body
    // excludedFields will be implemented separately...
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    // ex. MongoDB: { price:{ $gte: 5 } } URL: ?price[gte]=5
    //     Express: { price: { gte: 5 } }
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // SORT DATA ex. ?sort=price
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  // LIMIT FIELDS ex. ?fields=address,city
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  // PAGE QUERY
  paginate() {
    // page=3&limit=10 , 1-10 page1, 11-20 page2
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this
  }
}

module.exports = APIFeatures;