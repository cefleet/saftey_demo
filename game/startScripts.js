var myGame = {
  config : {
    playerSetup : {
      urlRoot : './models/',
      file : 'player.babylon',
      importMeshName:'Player',
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
    myGame.game.run();
  }
};


function start(){
  //TODO it may make sense to do things a little different. for example make a "player" json file that is loaded
    myGame.game = new A3D.Game.Adventure(myGame.config);
    myGame.game.loadScene('./scenes/','scene.babylon',myGame.scripts,{
      mainScene : true
    });
}

document.addEventListener( "DOMContentLoaded", start, false );
