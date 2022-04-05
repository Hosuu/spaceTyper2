export const settingsStructure = [
    {
        name: 'Word submition time',
        desc: 'Logs submtion time into console',
        key: 'logSubmitTime',
        type: 'checkbox',
    },
    {
        name: 'Disable functional keys',
        desc: "F1 ... F12 won't work anymore",
        key: 'disableFunctionalKeys',
        type: 'checkbox',
    },
    {
        name: 'Pause game on focus loss',
        key: 'pauseGameOnFocusLoss',
        type: 'checkbox',
    },
    {
        name: 'Pause game when opening any menu',
        key: 'pauseGameOnModalOpen',
        type: 'checkbox',
    },
    {
        name: 'Auto resume game on window focus',
        key: 'resumeGameOnFocus',
        type: 'checkbox',
    },
    'Collisions',
    {
        name: 'Enabled',
        desc: 'Moves colliding words (Huge performance impact)',
        key: 'collisionDetection',
        type: 'checkbox',
    },
    {
        name: 'Word padding',
        key: 'collisionPadding',
        type: 'number',
    },
    'Font',
    {
        name: 'Name',
        key: 'rootFontFamily',
        type: 'text',
    },
    {
        name: 'Size',
        key: 'rootFontSize',
        type: 'number',
    },
    'Typing Highlight',
    {
        name: 'Enabled',
        key: 'typingHighlight',
        type: 'checkbox',
    },
    {
        name: 'Typing highlight color',
        key: 'typingHighlightColor',
        type: 'color',
    },
    {
        name: 'Typing match color',
        key: 'typingMatchColor',
        type: 'color',
    },
    'DEV',
    {
        name: 'Draw word boundaires',
        key: 'DEVdrawWordBoundaries',
        type: 'checkbox',
    },
    {
        name: 'Draw word center point',
        key: 'DEVshowTextCenter',
        type: 'checkbox',
    },
    {
        name: 'Draw word origin point',
        key: 'DEVshowTextOrigin',
        type: 'checkbox',
    },
    {
        name: 'Draw game area boundaires',
        key: 'DEVdrawGameArea',
        type: 'checkbox',
    },
];
//# sourceMappingURL=SettingsModalStructure.js.map