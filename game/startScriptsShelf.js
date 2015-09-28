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
    A3D.ActiveGame.run();
  }
};

function start(){
  new A3D.Game(myGame.config);
  A3D.ActiveGame._loadScene('./scenes/','shelfMiniGame2.babylon',function(){
    myGame.DragAndDrop = new A3D.Module.DragAndDrop(myGame.config);
    myGame.DragAndDrop.loadModule(myGame.scripts);
  });
}
document.addEventListener( "DOMContentLoaded", start, false );
