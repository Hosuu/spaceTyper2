////////////////////////////////////////////////////
///////////////////  PROPERTIES  ///////////////////
////////////////////////////////////////////////////
const booleanProperties = {
    logSubmitTime: true,
    disableFunctionalKeys: false,
    typingHighlight: true,
    pauseGameOnFocusLoss: true,
    pauseGameOnModalOpen: true,
    resumeGameOnFocus: false,
    DEVshowTextOrigin: false,
    DEVdrawWordBoundaries: false,
    DEVshowTextCenter: false,
    DEVdrawGameArea: true,
    collisionDetection: true,
};
const stringProperties = {
    typingHighlightColor: '#00ffff',
    typingMatchColor: '#00ff00',
    rootFontFamily: 'Comfortaa, sans-serif',
};
const numeralProperties = {
    rootFontSize: 24,
    collisionPadding: 5,
};
////////////////////////////////////////////////////
//////////  TYPESCRIPT stuff don't touch  //////////
////////////////////////////////////////////////////
export const propertyDefaults = {
    ...booleanProperties,
    ...stringProperties,
    ...numeralProperties,
};
//# sourceMappingURL=SettingProperties.js.map