// Pre-process the data
var labelData = [];
var settings = {
    groupBy: 'candidate',
    sortBy: 'amount'
};

var pacList = [];
var industryList = [];
for (var i=0; i<dataset.length; i++) {
    var set = dataset[i];
    
    // Determine the list of PACs and industries
    if (pacList.indexOf(set.pac) === -1) {
        pacList.push(set.pac);
    }
    if (industryList.indexOf(set.industry) === -1) {
        industryList.push(set.industry);
    }

    // Fill in the blanks
    if (!set.industry) {
        dataset[i].industry = 'Unknown';
    }

    // Process external site links
    for (var j=1; j<=2; j++) {
        var key = 'link' + j;        
        if (set[key]) {            
            var url = set[key];
            var logo = '';
            var title = '';
            if (url.indexOf('wikipedia.org') > 0) {
                logo = 'wiki.png';
                title = 'Wikipedia';
            } else if (url.indexOf('opensecrets.org') > 0) {
                logo = 'secrets.ico';
                title = 'OpenSecrets';
            } else if (url.indexOf('cironline.org') > 0) {
                logo = 'cironline.png';                
                title = 'Center for Investigative Reporting';
            }            
            dataset[i][key] = '<a href="' + url + '" target="_blank" title="' + title + '"><img src="logos/' + logo + '"/></a>';            
        }
    }    
}
pacList.sort();
industryList.sort();

// Specify the chart area and dimensions
var chart = d3.select(".chart")
    .attr("width", 100)
    .attr("height", 100);

var labelWidth = 240,
    barGap = 10,
    barWidth = 80,
    chartWidth = $('.chart').width();

var colors = colors = d3.scale.category20c();
var stack = d3.layout.stack()
    .values(function(d) { return d.values; });

var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);  

function drawChart() {
    //console.log('== Draw chart - group:%s sort:%s', settings.groupBy, settings.sortBy);
    d3.selectAll("svg > *").remove();
    labelData = processData();
    drawLabels();
    drawRects();    
    $('.chart').height((labelData.length * (barGap + barWidth) + 20));
};

function drawRects() {
    var scale = d3.scale.linear()
        .domain([0, getMax()])
        .range([0, chartWidth - labelWidth]);

    var donation = chart.selectAll("g")
          .data(dataset).enter()
        .append("svg:g")
          .style("fill", function(d, i) { return "#ea504e"; })
          .style("stroke", function(d, i) { return 10; })
        .append("svg:rect")
          .attr("class", "donation")
          .attr("x", function(d) { return labelWidth + scale(d.prevAmount); })
          .attr("y", function(d) { return findRow(d) * (barWidth + barGap); })
          .attr("fill", function(d,i) { return colors(d.id); })
          .attr("height", barWidth)
          .attr("width", function(d) { return scale(d.amount || 0); })
          .on("mouseover", function(d) {
            div.transition()
                .duration(300)  
                .style("opacity", .9);        
            div.html('<div class="pull-right">' + (d.link1 || '') + (d.link2 || '') + '</div>' +
                    '<div class="name">' + truncate(d.name, 25) + '</div>' +
                    '<div class="pac">' + d.pac + '</div>' +
                    '<div class="industry pull-right">' + d.industry + '</div>' +
                    '<div class="amount">$' + d.amount + ' Million</div>'
                )  
                .style("left", ($('.chart').offset().left + labelWidth + scale(d.prevAmount)) + "px")
                .style("top", $('.chart').offset().top + (findRow(d) * (barWidth + barGap)) + "px");        
          });
}


function findRow(set) {
    for (var i=0; i<labelData.length; i++) {
        var data = labelData[i];
        var groupBy = settings.groupBy;
        var key = (groupBy == 'Super PAC' ? 'pac' : groupBy.toLowerCase());
        if (data.name == set[key]) {
            return i;
        }
    }
    return -1;
}

function getMax() {
    var max = 0;
    for (var i=0; i<labelData.length; i++) {
        var data = labelData[i];
        max = Math.max(max, data.amount);
    }
    return max;
}

function drawLabels() {
    chart.selectAll("g.candidate-name")
        .data(labelData)
        .enter().append("text")
        .attr("class", "candidate-name")
        .attr("x", 0)
        .attr("y", function(d, i) { return (i * (barWidth + barGap) + 35) })
        .text(function(d, i) { return d.name  });

    chart.selectAll("g.candidate-amount")
        .data(labelData)
        .enter().append("text")
        .attr("class", "candidate-amount")
        .attr("x", 0)
        .attr("y", function(d, i) { return (i * (barWidth + barGap) + 65) })
        .text(function(d, i) { return '$' + (d.amount ? d.amount.toFixed(2) : 0) + ' Million' });    
}

function compareValues(a, b, field, direction) {
    var value1 = a[field] || '';
    var value2 = b[field] || '';

    if (typeof value1 === 'string' 
        && typeof value2 === 'string') {
        value1 = value1.toLowerCase();
        value2 = value2.toLowerCase();
        return value1.localeCompare(value2);
    } else {
        return direction == 'asc' ? value1 - value2 : value2 - value1;
    }
}

function processData() {
    dataset.sort(function(a, b) {
        if (compareValues(a, b, settings.groupBy) === 0) {
            return compareValues(a, b, settings.sortBy, 'asc');
        } else {
            return compareValues(a, b, settings.groupBy, 'asc');
        }
    });

    var counter = 0;
    var lastValue = 0;
    var lastGroup = false;
    var data = [];
    if (settings.groupBy == 'candidate') {
        data.push({'name': 'Bernie Sanders', 'amount': 0});
    }
    for (var i=0; i<dataset.length; i++) {
        var set = dataset[i];
        if (lastGroup != set[settings.groupBy]) {
            lastValue = 0;
        }

        // calculate the totals
        var groupBy = set[settings.groupBy];
        if (!lastValue) {
            data.push({'name': groupBy, 'amount': 0});
        };
        data[data.length-1].amount += set.amount;
        dataset[i].id = counter++;
        dataset[i].prevAmount = lastValue;
        lastValue += set.amount;
        lastGroup = set[settings.groupBy];
    }
    data.sort(function(a, b) {
        if (settings.groupBy === 'candidate') {
            if (a.name == 'Bernie Sanders') return -1;
            if (b.name == 'Bernie Sanders') return 1;
        }
        return compareValues(a, b, 'amount', 'desc');
    });
    return data;
}