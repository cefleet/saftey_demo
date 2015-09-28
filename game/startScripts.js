var myGame = {
  config : {
    cameraSetup : {
      position : {
        x:0,
        y: 16,
        z:0
      },
      rotation : {
        x: 1.571,
        y:3.14,
        z:0
      }
    }
  },

  scripts : function(){
    //TODO this is where you can add your own game logic
    var game = A3D.ActiveGame;

    game.inputs.mouse.inputMap.leftmouse.funcs.rPick = {
      onDown : function(iE){
        if(myGame.DragAndDrop.pickedMesh){
          if(myGame.DragAndDrop.pickedMesh.name.startsWith('choice')){
            myGame.DragAndDrop.aPickedMesh = myGame.DragAndDrop.pickedMesh;
            var n = myGame.DragAndDrop.pickedMesh.name.replace('choice.','');
            for(var i = 0; i < myGame.DragAndDrop.inPlaces.length; i++){
              if(myGame.DragAndDrop.inPlaces[i].name.endsWith(n)){
                myGame.DragAndDrop.placedMesh = myGame.DragAndDrop.inPlaces[i];
              }
            }

            if(myGame.DragAndDrop.placedMesh){
              myGame.DragAndDrop.placedMesh.setLocation(
                myGame.DragAndDrop.placedMesh.inPlacePosition
              );
              myGame.DragAndDrop.pickedMesh.b3Dmeshes[0].renderOverlay = false;
            }
          }
        }
      },

      onUp : function(){
        if(myGame.DragAndDrop.aPickedMesh){
          myGame.DragAndDrop.aPickedMesh.b3Dmeshes[0].renderOverlay = true;
        }
        if(myGame.DragAndDrop.placedMesh){
          myGame.DragAndDrop.placedMesh.setLocation(
            myGame.DragAndDrop.placedMesh.outPlacePosition
          );
          myGame.DragAndDrop.placedMesh = null;
        }
      }
    };

    var s = A3D.ActiveGame.mainScene;
    myGame.DragAndDrop.choices = [];
    myGame.DragAndDrop.inPlaces = [];
    for(var o in s.Obstacle){
      if(s.Obstacle[o].name.startsWith('choice')){
        myGame.DragAndDrop.choices.push(s.Obstacle[o]);
        s.Obstacle[o].b3Dmeshes[0].renderOverlay = true;
        s.Obstacle[o].b3Dmeshes[0].overlayColor = {r:0.6,g:0.6,b:0.6};
      }
      if(s.Obstacle[o].name.startsWith('InPlace')){
        myGame.DragAndDrop.inPlaces.push(s.Obstacle[o]);
        s.Obstacle[o].inPlacePosition = s.Obstacle[o].position;
        s.Obstacle[o].setLocation({x:s.Obstacle[o].position+100,y:s.Obstacle[o].position+100,z:0});
        s.Obstacle[o].outPlacePosition = s.Obstacle[o].position;
        s.Obstacle[o].b3Dmeshes[0].visibility = 0.4;
      }
    }

    A3D.ActiveGame.run();
  }
};

function start(){
  new A3D.Game(myGame.config);
  A3D.ActiveGame._loadScene('./scenes/','shelfMiniGame.babylon',function(){
    myGame.DragAndDrop = new A3D.Module.DragAndDrop(myGame.config);
    myGame.DragAndDrop.loadModule(myGame.scripts);
  });

}

document.addEventListener( "DOMContentLoaded", start, false );
