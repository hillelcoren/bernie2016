var candidates = [
    'Bernie Sanders',
    'Hillary Clinton',
    'Jeb Bush',
    'Ted Cruz',
    'Marco Rubio',
    'Scott Walker',
]

var totals = [
    0,
    17.09,
    103.17,
    37.83,
    16.06,
    26.23,
]
var max = 103.17;

// Pre-process the data filling in the zeros
var counter = 0;
for (var i=0; i<dataset.length; i++) {
    var set = dataset[i];    
    var candidateId = candidates.indexOf(set.candidate);
    if (candidateId < 0) {
        console.log('Error: unknown candidate %s', set.candidate);
    }
    dataset[i].values = [{
        "id": counter++,
        "x": candidateId,
        "y": set.amount,
    }]
    for (var j=0; j<candidates.length; j++) {
        var hasCandidate = false;
        for (var k=0; k<set.values.length; k++) {
            var donation = set.values[k];
            if (donation.x == j) {
                hasCandidate = true;
                break;
            }
        }
        if (!hasCandidate) {
            dataset[i]["values"].splice(j, 0, {"x":j, "y":0, "id": 0});
        }
    }
}
//console.log(JSON.stringify(dataset));
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

var scale = d3.scale.linear()
    .domain([0, max])
    .range([0, chartWidth - labelWidth]);

var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);  

var donation = chart.selectAll("g.donation")
      .data(stack(dataset))
      .enter().append("svg:g")
      .style("fill", function(d, i) { return "#ea504e"; })
      .style("stroke", function(d, i) { return 10; });

var group = donation.selectAll("rect")
      .data(function(d){return d.values;})
      .enter();

var rect = group.append("svg:rect")
      .filter(function(d) { return d.y > 0 })
      .attr("class", "donation")
      .attr("x", function(d) { return labelWidth + scale(d.y0); })
      .attr("y", function(d) { return d.x * (barWidth + barGap); })
      .attr("fill", function(d,i) { return colors(d.id) })
      .attr("height", barWidth)
      .attr("width", function(d) { return scale(d.y); })
      .on("mouseover", function(d) {
        div.transition()
            .duration(300)  
            .style("opacity", .9);        
        div.html('<div class="name">' + truncate(dataset[d.id].name, 25) + '</div>' +
                '<div class="pac">' + dataset[d.id].pac + '</div>' +
                '<div class="amount">$' + dataset[d.id].amount + ' Million</div>'
            )  
            .style("left", ($('.chart').offset().left + labelWidth + 4 + scale(d.y0)) + "px")
            .style("top", $('.chart').offset().top + (d.x * (barWidth + barGap)) + "px");        
      });

chart.selectAll("g.candidate-name")
    .data(candidates)
    .enter().append("text")
    .attr("class", "candidate-name")
    .attr("x", 0)
    .attr("y", function(d, i) { return (i * (barWidth + barGap) + 35) })
    .text(function(d, i) { return candidates[i]  });

chart.selectAll("g.candidate-amount")
    .data(candidates)
    .enter().append("text")
    .attr("class", "candidate-amount")
    .attr("x", 0)
    .attr("y", function(d, i) { return (i * (barWidth + barGap) + 65) })
    .text(function(d, i) { return '$' + (+totals[i] || 0).toFixed(2) + ' Million' });


/*!
* classie - class helper functions
* from bonzo https://github.com/ded/bonzo
* 
* classie.has( elem, 'my-class' ) -> true/false
* classie.add( elem, 'my-new-class' )
* classie.remove( elem, 'my-unwanted-class' )
* classie.toggle( elem, 'my-class' )
*/

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

    'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
    hasClass = function( elem, c ) {
        return elem.classList.contains( c );
    };
    addClass = function( elem, c ) {
        elem.classList.add( c );
    };
    removeClass = function( elem, c ) {
        elem.classList.remove( c );
    };
}
else {
    hasClass = function( elem, c ) {
        return classReg( c ).test( elem.className );
    };
    addClass = function( elem, c ) {
        if ( !hasClass( elem, c ) ) {
            elem.className = elem.className + ' ' + c;
        }
    };
    removeClass = function( elem, c ) {
        elem.className = elem.className.replace( classReg( c ), ' ' );
    };
}

function toggleClass( elem, c ) {
    var fn = hasClass( elem, c ) ? removeClass : addClass;
    fn( elem, c );
}

var classie = {
// full names
hasClass: hasClass,
addClass: addClass,
removeClass: removeClass,
toggleClass: toggleClass,
// short names
has: hasClass,
add: addClass,
remove: removeClass,
toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
// AMD
define( classie );
} else {
// browser global
window.classie = classie;
}

})( window );


/**
* cbpAnimatedHeader.js v1.0.0
* http://www.codrops.com
*
* Licensed under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 
* Copyright 2013, Codrops
* http://www.codrops.com
*/
var cbpAnimatedHeader = (function() {

    var docElem = document.documentElement,
    header = document.querySelector( '.navbar-fixed-top' ),
    didScroll = false,
    changeHeaderOn = 300;

    function init() {
        window.addEventListener( 'scroll', function( event ) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 250 );
            }
        }, false );
    }

    function scrollPage() {
        var sy = scrollY();
        if ( sy >= changeHeaderOn ) {
            classie.add( header, 'navbar-shrink' );
        }
        else {
            classie.remove( header, 'navbar-shrink' );
        }
        didScroll = false;        
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    init();

})();

function truncate(string, length){
   if (string.length > length)
      return string.substring(0,length)+'...';
   else
      return string;
};