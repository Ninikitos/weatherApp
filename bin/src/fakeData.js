class FakeData {
  constructor() {
    this.temperature = {
      Monday: 90,
      Tuesday: 90,
      Wednesday: 90,
      Thursday: 90,
      Friday: 90,
      Saturday: 90,
      Sunday: 90
    };
    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.hours = [{
      onePm: 1
    }, {
      twoPm: 2
    }, {
      threePm: 3
    }, {
      fourPm: 4
    }, {
      fivePm: 5
    }, {
      sixPm: 6
    }, {
      sevenPm: 7
    }, {
      eightPm: 8
    }, {
      ninePm: 9
    }, {
      tenPm: 10
    }, {
      elevenPm: 11
    }, {
      twelvePm: 12
    }];
    this.city = 'Miami';
    this.conditions = {
      Sunny: 'Sunny',
      Rainy: 'Rainy',
      Cloudy: 'Cloudy',
      Snow: 'Snow'
    };
  }

}

export default FakeData;
