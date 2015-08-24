function renderChart() {
    var data = {
        labels: [
        'Bernie Sanders', 
        'Hillary Clinton', 
        'Jeb Bush',
        'Ted Cruz', 
        'Scott Walker',
        'Marco Rubio', 
        ],
        series: [
        {
            label: '',
            values: [0, 17.09, 103.17, 37.83, 26.23, 16.06]
        },
        ]
    };

    var chartWidth       = window.innerWidth - 260,
    barHeight        = Math.max((window.innerHeight / 6) - 40, 50);
    groupHeight      = barHeight * data.series.length,
    gapBetweenGroups = 10,
    spaceForLabels   = 180,
    spaceForLegend   = 0,
    isLarge          = window.innerWidth > 1500,
    isSmall          = window.innerWidth < 768;


// Zip the series data together (first values, second values, etc.)
var zippedData = [];
for (var i=0; i<data.labels.length; i++) {
    for (var j=0; j<data.series.length; j++) {
        zippedData.push(data.series[j].values[i]);
    }
}

// Color scale
var color = d3.scale.category20();
var chartHeight = (barHeight * zippedData.length) + (gapBetweenGroups * data.labels.length);
chartHeight += 60;

var x = d3.scale.linear()
.domain([0, d3.max(zippedData)])
.range([0, chartWidth]);

var y = d3.scale.linear()
.range([chartHeight + gapBetweenGroups, 0]);

var yAxis = d3.svg.axis()
.scale(y)
.tickFormat('')
.tickSize(0)
.orient("left");

// Specify the chart area and dimensions
var chart = d3.select(".chart")
.attr("width", spaceForLabels + chartWidth + spaceForLegend)
.attr("height", chartHeight);

// Create bars
var bar = chart.selectAll("g")
.data(zippedData)
.enter().append("g")
.attr("transform", function(d, i) {
    return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
});

// Create rectangles of the correct width
bar.append("rect")
.attr("fill", function(d,i) { return i == 1 ? '#327bbe' : '#ea504e' })
.attr("class", "bar")
.attr("width", 0)
.attr("height", barHeight - 1);

// Add text label in bar
bar.append("text")
.attr("class", "amount")
.attr("x", function(d) { return isSmall ? 20 : x(d) - 20; })
.attr("y", barHeight / 2)
.attr("fill", "red")
.attr("dy", ".35em")
.text(function(d) { return '$' + d + (isLarge ? ' Million' : 'M' ); });

// Draw labels
bar.append("text")
.attr("class", "label")
.attr("x", function(d) { return -10; })
.attr("y", groupHeight / 2)
.attr("dy", ".35em")
.text(function(d,i) {
    if (i % data.series.length === 0)
        return data.labels[Math.floor(i/data.series.length)];
    else
        return ""});

chart.append("g")
.attr("class", "y axis")
.attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
.call(yAxis);

d3.selectAll("rect")
.transition()
.delay(function (d, i) { return i=0 ? 0 : i*150; })
.duration(700)
//.ease("bounce")
.attr("width", x);
};

$(function() {
    renderChart();    
})


$(window).resize(function() {
    clearTimeout($.data(this, 'resizeTimer'));
    $.data(this, 'resizeTimer', setTimeout(function() {
//do something
d3.selectAll("svg > *").remove();        
renderChart();
}, 800));
});

$(window).on("resize", function() {
//renderChart();
});



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