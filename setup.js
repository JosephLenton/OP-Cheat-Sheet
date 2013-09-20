"use strict";

(function() {
    var reaperEnters = { from: 4*60+10  , to: 4*60+30, text: 'reaper expand arrives', css: 'scout' };
    var scv9Scout    = { from: 1*60     , to: 1*60+20, text:  '9 SCV scout arrives', css: 'scout' };
    var scv13Scout   = { from: 2*60     , to: 2*60+20, text: '13 SCV scout arrives', css: 'scout' };

    starcraft.sections({
            TvP: function(build) {
                build.timeline( 0, 600,
                        scv9Scout,
                        scv13Scout,
                        reaperEnters,

                        {
                            at: 60+40,
                            text: '1 proxy gateway',
                            css: 'pressure',
                            info: 'pull 5 SCVs, or 6 if there is a delay, and surround gateway',

                            points: [
                                {
                                    at: 60+60,
                                    text: '2nd proxy gateway',
                                    css: 'all-in',
                                    info: 'pull 8 to 10 SCVs, and surround 1st gateway'
                                }
                            ]
                        },

                        {
                            at: 3*60 + 40,
                            text: 'late 2nd pylon',
                            css: 'aggressive',
                            points: {
                                text: 'proxy 1 gas Pylon'
                            }
                        },

                        {
                            at: 2*60 + 10,
                            text: 'fast 2 gas',
                            css: 'look-for',

                            points: [
                                    'proxy Stargate',
                                    'Stargate'
                            ]
                        },

                        {
                            at: 4*60,
                            text: '1 gas',
                            css: 'look-for',

                            points: [
                                    'chrono-warpgate',
                                    'Gateway expand'
                            ]
                        },

                        {
                            at: 4*60 + 30,
                            text: 'Nexus',
                            points: 'macro',
                            css: 'macro'
                        },

                        {
                            at: 4*60 + 30,
                            text: 'Stargate',
                            css: 'aggressive',

                            points: [
                                    {
                                        at: 6*60 + 45,
                                        text: 'Oracle!'
                                    },
                                    'Phoenix',
                                    'Void Ray'
                            ]
                        },

                        {
                            at: 4*60 + 25,
                            text: 'proxy Stargate',
                            css: 'aggressive',

                            points: [
                                    {
                                        at: 5*60,
                                        text: '3 Gateways',
                                        css: 'look-for',

                                        points: {
                                            at: 6*60 + 15,
                                            text: 'proxy Oracle!',
                                            css: 'pressure',

                                            points: {
                                                at: 6*60 + 50,
                                                text: '3 Gateway / Oracle',
                                                css: 'all-in'
                                            }
                                        }
                                    }
                            ]
                        },

                        {
                            at: 6*60,

                            text: 'proxy pylon',
                            points: [
                                    {
                                        text: 'proxy Stargate',
                                        points: {
                                            text: 'Oracles!',
                                        }
                                    },

                                    {
                                        text: 'proxy Twilight Council',
                                        points: {
                                            text: 'Dark Shrine',
                                            points: 'Dark Templars!'
                                        }
                                    },

                                    {
                                        text: 'proxy warp-ins',
                                        points: 'Dark Templars!'
                                    }
                            ]
                        },

                        {
                            at: 4*60 + 20,
                            text: 'stalker before 2nd pylon',
                            points: 'proxy pylon'
                        },

                        {
                            at: 8*60,
                            text: 'macro'
                        }
                );
            },

            TvT: function(build) {
                build.timeline( 0, 600,
                        scv9Scout,
                        scv13Scout,
                        reaperEnters
                );
            },

            TvZ: function(build) {
                build.timeline( 0, 600,
                        scv9Scout,
                        scv13Scout,
                        reaperEnters
                );
            }
    });
})();

