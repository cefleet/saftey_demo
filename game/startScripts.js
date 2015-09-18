var myGame = {
  config : {
    playerSetup : {
      urlRoot : './models/',
      file : 'player.babylon',
      importMeshName:'Player',
      boundsSize : {
        x : 0.5,
        y: 1,
        z : 0.5
      },
      boundsOffset : {
        x : 0,
        y: 1.8,
        z: 0
      },
      animationsMap : [
        {
          name : 'idle',
          start : 65,
          end : 85,
          options : {
            ratio : 0.6
          }
        },
        {
          name : 'running',
          start : 10,
          end : 40,
          options : {
            ratio: 1.8
          }
        },
        {
          name : 'walking',
          start : 10,
          end : 40
        }
      ],
      speedAnimationMap : [
        {
          animation : 'idle',
          targetDistance : null,
          speed: 0
        },
        {
          animation : 'walking',
          targetDistance : 0,
          speed : 0.025
        },
        {
          animation : 'running',
          targetDistance : 3,
          speed : 0.075
        }
      ]
    },

    targetSetup : {
      rootUrl : './models/',
      file : 'gototarget.babylon',
      animationsSetup : [
        {
          name : 'active',
          start: 0,
          end : 20,
          options : {
            ratio : 0.4
          }
        }
      ]
    }
  },

  scripts : function(s){
    A3D.ActiveGame.overlay = new A3D.Overlay({},this);

  var screen = new A3D.Object2D.Image({
    src : './images/testScreen.png',
    id : 'testScreen',
    dWidth : A3D.ActiveGame.overlay.canvas.width,
    dHeight: A3D.ActiveGame.overlay.canvas.height,
    clickArea : {
      x:0,
      y:0,
      height:A3D.ActiveGame.overlay.canvas.height,
      width:A3D.ActiveGame.overlay.canvas.width
    }
  });


    A3D.ActiveGame.mainScene.Trigger.TestTrigger.addActivateAction(new A3D.Action({
      func : function(){
        console.log(screen);
        A3D.ActiveGame.overlay.addObject2D(screen);
        A3D.ActiveGame.overlay.render();
        A3D.ActiveGame.pause();
        console.log('I have run into the Trigger');
        //TODO I can do anything right here.
      },
      active:false
    }));

    A3D.ActiveGame.mainScene.Trigger.TestTrigger.addDeactivateAction(new A3D.Action({
      func : function(){
        console.log('I have run off of the Trigger');
        //TODO I can do anything right here.
      },
      active:false,
      runFrames : 1
    }));

    A3D.ActiveGame.run();
  }
};


function start(){
    new A3D.Game.Adventure(myGame.config);
    A3D.ActiveGame.loadScene('./scenes/','scene.babylon',myGame.scripts,{
      mainScene : true
    });
}

document.addEventListener( "DOMContentLoaded", start, false );
