var React = require('react');
var Reactable = require('reactable');
var HTTP = require('../services/fetch.js');

var DataTable = React.createClass({
  getInitialState: function() {
    return {encounters : []};
  },
  componentWillMount: function() {
    // Get JWT.  Only 1 querystring entry expected
    var key = location.search.slice(1).split('=');
    options = {
      headers:{
        	"accept": "application/json"
      }
    }
    HTTP.get('/Patient?name=Smith', options)
    .then(function(data) {
      // fix data for table
      var displayData = formatDisplayData(data);
      this.setState({encounters : displayData});
    }.bind(this));
  },
  render: function() {
    var Table = Reactable.Table,
        Thead = Reactable.Thead,
        Th = Reactable.Th,
        Tr = Reactable.Tr,
        Td = Reactable.Td,
        unsafe = Reactable.unsafe;

      return(<Table className="table" id="pcmh-table" data={this.state.encounters} sortable={true} filterable={['Name', 'MRN']} noDataText="No matching records found." />);
  }
});

module.exports = DataTable;

function formatDisplayData(rawData) {

  var formattedData = rawData.map(function(row) {
    var formattedRow = {};
    formattedRow['fullUrl'] = row.fullUrl;
    formattedRow['Active'] = row.resource.active;
    formattedRow['MRN'] = row.resource.id;
    formattedRow['Name'] = row.resource.name[0].text;
    formattedRow['DOB'] = row.resource.birthDate;

    return formattedRow;
  });

  return formattedData;
}
