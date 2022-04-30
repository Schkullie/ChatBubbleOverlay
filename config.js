//For the whole config applies: Leave the '' in place. The code won't work without them.
//Also make sure to fill out all the settings

var channel = 'Twitchname';
//your Twitchname

var twitch_id = 'TwitchID';
//your Twitch ID can be found out here: https://www.streamweasels.com/support/convert-twitch-username-to-user-id/ (3rd Party site)

var filterBots = 'yes';
//filter out the most common chat bots. Put 'yes' to activate and 'no' to deactivate

var bot = 'BotName';
//you can also filter out your custom bot (in case you have one), if you put its name here

var font = 'OpenDyslexic';
//choose a font you want to use.
//Available: Roboto, Patrick Hand, VT323, OpenDyslexic

var fontSize = 25;
//set the font size. Recommended size 20-35

var indicator = 'right';
//set the little triangle at the bottom to the side you want with either 'left' or 'rigth'

//-------------------------------------------------------------

var mode = 'darkmode';
//can be changed between 'lightmode', 'darkmode' and 'custom'

//for custom colors choose them here: https://www.w3schools.com/colors/colors_names.asp

var CustomColor = 'white';
//sets the color of the text if custom mode is selected

var customBG = 'MidnightBlue';
//sets the color of the background if custom mode is selected

var TextOnly = 'no';
//remove the speech bubble design for text only mode. Put 'yes' to activate and 'no' to deactivate

//-------------------------------------------------------------

var namecolor = 'firebrick';
//choose the default name color in the case that Twitch doesn't provide one
//you can choose a color here: https://www.w3schools.com/colors/colors_names.asp

var commands = 'yes';
//toggle if chat bot commands (the ones using ! at the beginning) should be shown. Put 'yes' to activate and 'no' to deactivate

var thirdParty = 'yes';
//activates FFZ & BTTV emotes. Put 'yes' to activate and 'no' to deactivate

var badges = 'yes';
//toggle if badges (Broadcaster, Mod, VIP, Sub, Founder, Prime, Sub-Gift & Bits) should be shown. Put 'yes' to activate and 'no' to deactivate

var pronouns = 'yes';
//toggle if pronouns provided by https://pronouns.alejo.io/ (if availaible) should be shown. Put 'yes' to activate and 'no' to deactivate

var timestamp = 'no';
//toggle if a timestamp should be shown. Uses your local PC time. Put 'yes' to activate and 'no' to deactivate

var messages = 3;
//max number of messages to be shown on screen at once

var seconds = 15;
//the time the chat overlay will stay visible, after people stop sending chat messages.
//if set to 0 messages will not disappear

var wait = 6;
//seconds it takes until the messages get displayed in the overlay after beeing send in chat.