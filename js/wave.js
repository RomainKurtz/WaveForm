var waveArray = [];
var updateWaveTime = 10;
var sinusFreqDivid = 200;
var sinusMinMax = 50;
var cosMultiplyFreq = 1;

// Dat GUI
var gui = new dat.GUI();

// gui.add(this, 'agentsVisible').onChange(function(value) {
//     toogleAgentsVisible(value);
// });
/*
gui.add(this, 'restart');
*/
gui.add(this, 'updateWaveTime', 1, 50).onFinishChange(function(value) {
   // restart();
});
gui.add(this, 'sinusFreqDivid', 1, 500)
gui.add(this, 'sinusMinMax', 1, 100)
gui.add(this, 'cosMultiplyFreq', 0, 2);

 

var rainbow = new Rainbow();
 var hexColour = rainbow.colourAt(0);
var geometry = new THREE.Geometry();
geometry.colors = []
var mesh = null;
/*
THREE.ImageUtils.crossOrigin = '';
//var sprite = THREE.ImageUtils.loadTexture("http://i.imgur.com/lWBb0k4.png");
var sprite = new THREE.TextureLoader().load("./images/disc.png");

*/
start();
updateWave(geometry, function(){
     var start = new Date().getTime();
     var y = Math.sin(start/sinusFreqDivid);
     var z = Math.cos(start/sinusFreqDivid*cosMultiplyFreq);
     //geometry.vertices[0].y =(Math.random() - 0.5) *50;
     geometry.vertices[0].y = y*sinusMinMax;
     geometry.vertices[0].z = z*sinusMinMax;
});



function start() {


   
    createWaveUnit(geometry, 1000, 2);    

    var material = new THREE.PointsMaterial({ size: 2 , vertexColors: THREE.VertexColors/*, map: sprite*/, transparent: true });
    mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
}


function createWaveUnit(waveGeometry, unitNumber, distance){
    for (var i = 0; i < unitNumber; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = distance * i ;

        vertex.y = 0 ;
    
        vertex.z = 0;

        geometry.vertices.push(vertex);
        geometry.colors.push(new THREE.Color(parseInt("0x" + hexColour, 16)));

    }

    geometry.verticesNeedUpdate = true;

}

function updateWave(waveGeometry, callbackFinish){
        var tick = function() {
                // setTimeout(tick, 5000);
                for (var i =  geometry.vertices.length - 1 ; i > 0; i--) {
                    geometry.vertices[i].y =  geometry.vertices[i-1].y; 
                    geometry.vertices[i].z =  geometry.vertices[i-1].z; 
                }
                geometry.verticesNeedUpdate = true;
                callbackFinish();
                updateWave(waveGeometry, callbackFinish);

            }

        setTimeout(tick, updateWaveTime);

}
// Return a two dimentions array with all the adjacent grid square

function timedChunk(particles, positions, fn, context, callback) {
    var i = 0;
    var tick = function() {
        var start = new Date().getTime();
        for (; i < agentArray.length && (new Date().getTime()) - start < 50; i++) {
            agentArray[i].behaviour(agentArray[i], i);
            // fn.call(context, particles[i], positions[i]);
        }
        if (i < agentArray.length) {
            // Yield execution to rendering logic
            setTimeout(tick, 15);
        } else {
            timedChunk();
            // callback(positions, particles);
        }
    };
    setTimeout(tick, 15);
}


function noise(x, y) {
    var u = x / limitWorld.x;
    var v = y / limitWorld.y;

    return Math.sin(20 * u) * Math.sin(28 * v);
}

function noise2(x, y) {
    var uu = x / limitWorld.x;
    var vv = y / limitWorld.y;
    var t = clock.elapsedTime;
    var a = Math.cos(t) * 0.5;
    var b = Math.sin(t * 2.33) * 0.5;
    var p = new THREE.Vector3(uu, vv, a);
    var v = new THREE.Vector3();
    for (var i = 0; i < 50; i++) {
        var dp = p.dot(p);
        p.x = Math.abs(p.x) / dp;
        p.y = Math.abs(p.y) / dp;
        p.z = Math.abs(p.z) / dp;
        p.sub(new THREE.Vector3(1.0, 1.0, 0.5));
        p.x = Math.abs(p.x);
        p.y = Math.abs(p.y);
        p.z = Math.abs(p.z);
        v = p;
        v.multiply(new THREE.Vector3(1.3, 0.99, 0.7));
        p.x = v.x;
        p.z = v.y;
        p.y = v.z;
    }

    return new THREE.Vector2(p.x - 0.5, p.y - 0.5);
}

function noise3(x, y) {
    var uu = (x / limitWorld.x) * 2;
    var vv = (y / limitWorld.y) * 2;
    var d = uu * uu + vv * vv;
    var amp = 1 / (1 + Math.sqrt(d));

    return new THREE.Vector2(vv * amp, -uu * amp);


}
