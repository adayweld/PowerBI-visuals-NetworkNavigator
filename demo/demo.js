$(function() {

    function loadSlicer() {
        try {
            var slicerEle = $('#advanced-slicer');
            var slicer = new AdvancedSlicer(slicerEle);
            slicer.events.on('canLoadMoreData', function() { return false; });
            slicer.dimensions = { height: slicerEle.height(), width: slicerEle.width() };
            $.getJSON('slicerdata.json', function(data) {
                slicer.data = data;
            });
        } catch (e) {
            console.error(e);
        }
    }

    function loadTimescale() {
        try {
            var timescaleEle = $('#time-scale');
            var timeScale = new TimeScale(timescaleEle, { height: timescaleEle.height(), width: timescaleEle.width() });
            $.getJSON('timescaledata.json', function(data) {
                data.forEach(function (item) {
                item.date = new Date(item.date);
                });
                timeScale.data = data;
            });
            timeScale.events.on("rangeSelected", function (dates) {
                timescaleEle.find("#selected-range").text(dates[0] + " -> " + dates[1]);
            });
        } catch (e) {
            console.error(e);
        }
    }

    function loadDocumentViewer() {
        try {
            var documentViewerEle = $('#document-viewer');
            var documentviewer = new DocumentViewer(documentViewerEle, { height: documentViewerEle.height(), width: documentViewerEle.width() });
            documentviewer.data = [{
                items: [{
                    name: "From",
                    type: { text: {} },
                    value: "bill@microsoft.com"
                }, {
                    name: "To",
                    type: { text: {} },
                    value: "steve.jobs@apple.com"
                }, {
                    name: "Body",
                    type: { html: {} },
                    value: "I am <strong>Super</strong> excited about owning an <a target=\"_blank\" href=\"http://www.apple.com/iphone/\">Apple IPhone 5</a>"
                }]
            }];
        } catch (e) {
            console.error(e);
        }
    }

    function loadForceGraph() {
        try {
            var forceGraphEle = $('#force-graph');
            var forcegraph = new ForceGraph(forceGraphEle, forceGraphEle.width(), forceGraphEle.height());
            $.getJSON('forcegraphdata.json', function(data) {
                forcegraph.data = data;
            });
            var selectedNodeEle = $('#selected-node');
            forcegraph.events.on("selectionChanged", function (node) {
                selectedNodeEle.text(node ? node.name : "");
            });
        } catch (e) {
            console.error(e);
        }
    }

    function loadLineUp() {
        try {
            var lineUpEle = $('#line-up');
            var lineup = new LineUp(lineUpEle);
            $.getJSON('lineupdata.json', function(data) {
                var columns = [];
                for (var col in data[0]) {
                    columns.push({
                        displayName: col,
                        type: {
                            numeric: $.isNumeric(data[0][col]),
                            text: true
                        }
                    })
                }
                lineup.loadData(columns, data);
            });
        } catch (e) {
            console.error(e);
        }
    }

    loadSlicer();
    loadTimescale();
    loadDocumentViewer();
    loadForceGraph();
    loadLineUp();
});
