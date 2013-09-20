"use static";

var starcraft = window['starcraft'] = (function() {
    var TIMELINE_Y_INC = 30,
        TIMELINE_TIME_INC = 45;

    var TIMELINE_CLOSE_TIME_CUTOFF = 39,
        TIMELINE_CLOSE_TIME_Y_INC = 180;

    var TIME_TO_POSITION_MULT = 4;

    /* Utility Functions */

    var iterate = function( arr, startI, fun ) {
        if ( arguments.length === 2 ) {
            fun = startI;
            startI = 0;
        }

        for ( var i = startI; i < arr.length; i++ ) {
            fun( arr[i] );
        }
    }

    var newDiv = function() {
        var comp = document.createElement('div');
        comp.className = concatClasses( arguments, 0 );
        return comp;
    }

    var newHTML = function( type ) {
        var comp = document.createElement( type );
        comp.className = concatClasses( arguments, 1 );
        return comp;
    }

    var newButton = function( text ) {
        var html = document.createElement( 'a' );

        html.setAttribute( 'href', '#' );
        html.className = concatClasses( arguments, 1 );
        html.textContent = text;

        return html;
    }

    var sections = [];

    window.onload = function() {
        var topbar = document.getElementsByClassName('starcraft-topbar')[0];
        var main = document.getElementsByClassName('starcraft-main')[0];

        var resetMain = function( f ) {
            main.className = mainHideClass;

            setTimeout(function() {
                main.innerHTML = '';

                setTimeout(function() {
                    var div = document.createElement('div');
                    div.className = 'starcraft-main-content ';

                    f( div );
 
                    main.appendChild( div );

                    setTimeout(function() {
                        main.className = mainShowClass;
                    }, 0);
                }, 1 );
            }, 200);
        }

        var addTimelineConnection = function( div, from, to ) {
            if ( from && to ) {
                var line = newDiv( 'starcraft-timeline-connection' );

                var fromX = from.offsetLeft;
                var fromY = from.offsetTop;
                var toX = to.offsetLeft;
                var toY = to.offsetTop + (to.offsetHeight/4)*3;

                var width = toX - fromX;
                var height = toY - fromY;

                var hypot = Math.sqrt( width*width + height*height ) - 120;

                if ( width === 1100 ) {
                    console.log( from.querySelector('div').textContent );
                    console.log( to.querySelector('div').textContent );
                }

                line.style.width = hypot + 'px';

                line.style.left = (fromX + width/2) + 'px';
                line.style.top  = (fromY + height/2) + 'px';

                var angle = Math.atan2( toY-fromY, toX-fromX );

                var cssProp = 'translateX(-' + hypot/2 + 'px) rotate(' + angle + 'rad)' ;
                line.style.MozTransform = 
                line.style.webkitTransform =
                line.style.transform =
                        cssProp;

                div.appendChild( line );
            }
        }

        var addTimelineItem = function( div, item, lastTime, yPosition, seenItems, laterPoints ) {
            var itemDiv = newDiv('starcraft-timeline-item');

            var content = newDiv('starcraft-timeline-item-content', item.css);
            content.textContent = item.text;
            itemDiv.appendChild( content );

            if ( item.name || item.text ) {
                seenItems[item.name || item.text] = itemDiv;
            }

            if ( item.at ) {
                if ( item.at-lastTime < TIMELINE_CLOSE_TIME_CUTOFF ) {
                    yPosition += TIMELINE_CLOSE_TIME_Y_INC;
                }

                lastTime = timeToWidth( item.at );
                itemDiv.style.left = lastTime + 'px';
            } else {
                itemDiv.style.left = lastTime + timeToWidth( TIMELINE_TIME_INC ) + 'px';
            }

            itemDiv.style.top = yPosition + 'px';

            div.appendChild( itemDiv );

            var dontIncrementY = false;

            if ( item.points ) {
                if ( item.points instanceof Array ) {
                    var points = [];

                    for ( var i = 0; i < item.points.length; i++ ) {
                        var pointItem = item.points[i];

                        if ( pointItem instanceof Object ) {
                            yPosition = addTimelineItem( div, pointItem, lastTime, yPosition, seenItems, laterPoints );
                            dontIncrementY = true;
                        } else {
                            points.push( item.points[i] );
                        }
                    }

                    if ( points.length > 0 ) {
                        laterPoints.push({ points: item.points, div: itemDiv });
                    }
                } else if ( item.points instanceof Object ) {
                    addTimelineItem( div, item.points, lastTime, yPosition, seenItems, laterPoints );
                } else {
                    laterPoints.push({ points: item.points, div: itemDiv });
                }
            }

            if ( dontIncrementY ) {
                return yPosition;
            } else {
                return yPosition + TIMELINE_Y_INC;
            }
        }

        var timeToWidth = function( n ) {
            return n*TIME_TO_POSITION_MULT;
        }

        var builder = {
                timeline: function( from, to ) {
                    var args = arguments;

                    resetMain( function(div) {
                        div.className += 'timeline';

                        div.style.width = timeToWidth( to-from ) + 'px';

                        var seenItems = {};
                        var laterPoints = [];

                        var lastTime = 0;
                        var yPosition = TIMELINE_Y_INC;

                        iterate( args, 2, function(item) {
                            if ( item.from !== undefined && item.to !== undefined ) {
                                var timeMark = newDiv('starcraft-timeline-mark', item.css);
                                timeMark.textContent = item.text;

                                timeMark.style.left = timeToWidth(item.from) + 'px';
                                timeMark.style.width = timeToWidth(item.to-item.from) + 'px';

                                div.appendChild( timeMark );
                            } else {
                                yPosition = addTimelineItem( div, item, lastTime, yPosition, seenItems, laterPoints ) + TIMELINE_Y_INC;
                            }
                        } );

                        setTimeout( function() {
                            for ( var i = 0; i < laterPoints.length; i++ ) {
                                var item = laterPoints[i];
                                var ps = item.points;

                                if ( ps instanceof Array ) {
                                    for ( var j = 0; j < ps.length; j++ ) {
                                        addTimelineConnection( div, item.div, seenItems[ps[j]] );
                                    }
                                } else if ( typeof ps === 'string' ) {
                                    addTimelineConnection( div, item.div, seenItems[ps] );
                                }
                            }
                        }, 0);
                    } );
                }
        };

        var mainHideClass = main.className;
        var mainShowClass = mainHideClass + ' show';

        var buttons = [];

        for ( var i = 0; i < sections.length; i++ ) {
            var section = sections[i];

            var button = newButton( section.name, 'starcraft-topbar-button' );
            buttons.push( button );

            if ( i === 0 ) {
                button.className += ' selected';
            }

            button.onclick = (function(button, f) {
                return function() {
                    for ( var i = 0; i < buttons.length; i++ ) {
                        if ( buttons[i].className !== 'starcraft-topbar-button' ) {
                            buttons[i].className = 'starcraft-topbar-button';
                        }
                    }

                    button.className = 'starcraft-topbar-button selected';

                    f( builder );

                    return false;
                }
            })(button, section.fun);

            topbar.appendChild( button );
        }

        if ( sections.length > 0 ) {
            sections[0].fun( builder );
        }
    }

    var concatClasses = function( args, startIndex, endIndex ) {
        if ( startIndex === undefined ) {
            startIndex = 0;
        }

        if ( endIndex === undefined || endIndex > args.length ) {
            endIndex = args.length;
        }

        var str = '';

        for ( i = startIndex; i < endIndex; i++ ) {
            var klass = args[i];

            if ( klass ) {
                if ( str !== '' ) {
                    str += ' ';
                }

                str += klass;
            }
        }

        return str;
    }

    return {
            sections: function(name, fun) {
                if ( arguments.length === 1 ) {
                    for ( var k in name ) {
                        if ( name.hasOwnProperty(k) ) {
                            starcraft.sections( k, name[k] );
                        }
                    }
                } else {
                    sections.push({ name: name, fun: fun });
                }
            }
    }
})();
