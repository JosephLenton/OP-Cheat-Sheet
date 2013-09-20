"use strict";

(function() {
    var reaperEnters = { from: "4:10", to: "4:30", text: 'reaper expand arrives', css: 'scout' };
    var scv9Scout    = { from: "1:00", to: "1:20", text:  '9 SCV scout arrives' , css: 'scout' };
    var scv13Scout   = { from: "2:00", to: "2:20", text: '13 SCV scout arrives' , css: 'scout' };

    starcraft.sections({
            TvP: function(build) {
                build.timeline( 0, 600,
                        scv9Scout,
                        scv13Scout,
                        reaperEnters,

                        {
                            at: "1:40",
                            text: '1 proxy gateway',
                            css: 'pressure',
                            info: 'pull 5 SCVs, or 6 if there is a delay, and surround gateway',

                            points: [
                                {
                                    at: "2:03",
                                    text: '2nd proxy gateway',
                                    css: 'all-in',
                                    info: 'pull 8 to 10 SCVs, and surround 1st gateway'
                                }
                            ]
                        },

                        {
                            at: "3:40",
                            text: 'late 2nd Pylon',
                            css: 'aggressive',

                            points: {
                                text: 'proxy 1 gas Pylon',
                                css: 'aggressive'
                            }
                        },

                        {
                            at: "2:10",
                            text: 'fast 2 gas',
                            css: 'look-for',

                            points: [
                                    'proxy Stargate',
                                    'Stargate'
                            ]
                        },

                        {
                            at: "4:10",
                            text: '1 gas',
                            css: 'look-for',

                            points: [
                                    {
                                        text: 'Chronoboost Cybernetics Core',
                                        css: 'aggressive',
                                        points: 'Gateway pressure'
                                    },

                                    {
                                        at: "4:30",
                                        text: 'Nexus',
                                        css: 'macro',

                                        points: {
                                            at: "8:00",
                                            text: 'macro',
                                            css: 'macro'
                                        }
                                    }
                            ]
                        },

                        {
                            at: "5:10",
                            text: "delayed Nexus",
                            css: "aggressive",
                            info: "The nexus is delayed, as Protoss has spent money on gateways or tech, before building it",

                            points: {
                                at: "6:15",
                                text: 'Oracle pressure!',
                                css: 'pressure'
                            }
                        },

                        {
                            at: "4:20",
                            text: 'Stargate',
                            css: 'aggressive',

                            points: [
                                    "Oracle prssure!",

                                    {
                                        at: "5:00",
                                        text: '3 Gateways',
                                        css: 'look-for',

                                        points: {
                                            at: "6:50",
                                            text: '3 Gate Oracle',
                                            css: 'all-in'
                                        }
                                    }
                            ]
                        },

                        {
                            at: 6*60,

                            text: 'proxy pylon',
                            points: [
                                    'proxy Stargate',

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

