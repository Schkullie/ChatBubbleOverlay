# Twitch Chat Bubble Overlay

![version](https://img.shields.io/badge/Version-2.1-success?style=for-the-badge) ![platform](https://img.shields.io/badge/Platforms-OBS%2FSLOBS-informational?style=for-the-badge)

This is a fully configurable dynamic chat overlay.</br>
I wanted to create my own aesthetic looking and functional chat overlay, while learning to code.</br>
The outcome is this overlay, you can use and configure however you like.

## Features ##

**Pronouns, Badges & Timestamps**
</br>This chat overlay integrates & shows the pronouns provided by [the popular browser add-on by Alejo](https://pronouns.alejo.io/) *(not affiliated)*</br>
It can also show off the badges your viewers collected & make the current time visible for the VOD. (including the premium FFZ ones)</br>
The current release includes the most used Twitch badges, but not all of them.</br>
All the options shown can be mixed and matched to one's liking.

![badges](https://cdn.discordapp.com/attachments/900379061900156948/970071286833352795/Badges.jpg)

**Keep your stream clean**
</br>This overlay will remove messages from the overlay, if they get removed from the chat through moderating actions (like clearing chat or timing out people)</br>
If you set up the message delay the messages won't even show up on the overlay, if they are removed during the delay time.</br>
This is in consideration of hate raids happening on Twitch as well as only a few of the popular chat overlays I know reacting to moderation actions.

**Light-, Dark-, Custom- & "text only"-mode**
</br>2 presets and a fully customizable color scheme are available for you to use.</br>
If you don't like the chat bubble style there's also a text only option.

![modes](https://cdn.discordapp.com/attachments/900379061900156948/970010213421822002/Modes.jpg)

**3rd party emotes**
</br>This overlay supports BetterTwitchTV, FrankerFaceZ and 7TV Emotes. (as well as the default Twitch ones of course)

![3rd party](https://cdn.discordapp.com/attachments/900379061900156948/970068795576168469/emotes.gif)

**No matter the side, you're covered**
</br>The overlay can be displayed left or right facing adjusted to your needs.

![side](https://cdn.discordapp.com/attachments/900379061900156948/970010213614751764/Sides.jpg)

## Planned Features ##
I've been working on this for quite some time and I'm not planing on working on this as actively as I've been for the 2.0 release.</br>
So the following are things that could still be done, but will take time:
- ~~Add custom FrankerFaZ badges to replace standard ones (toggleable)~~ *(added in 2.1)*
- ~~Add 7TV emotes~~ *(added in 2.1)*
- Improve animations & look
- Saving chat upon refresh
- Port the widget to Streamelements

## Setup ##
1. Download all the files and extract them somewhere on your PC

2. Open the ``config.js`` with an text editor (Notepad++ is recommended)

   1. Fill in your Twitch username & TwitchID (provided [here](https://www.streamweasels.com/support/convert-twitch-username-to-user-id/) [3rd party site]) 

   2. Edit all the other parameters to your liking

3. Add the "chat bubble.html" file as a browser source in OBS by using 'local file' [further instructions](https://obsproject.com/wiki/Sources-Guide#browser-source)</br>
(recommended settings: width=800 px, height=1000 px)

## Troubleshooting ##
1. __Chat doesn't carry over to other scenes__</br>
Make sure "refresh browser when scene becomes active" is disabled in the browser source settings. Otherwise it will refresh the browser and your messages will be gone.
2. __The overlay doesn't show messages__</br>
Make sure you spelt your Twitch username correctly and added the TwitchID (both are needed to guarantee the overlay to work)</br>

If you find any other problems, please let me know and I'll try to fix them. Feel free to open an issue here on GitHub.

## Credits: ##
This overlay is only possible thanks to [ComfyJS](https://github.com/instafluff/ComfyJS) made by [@Instafluff](https://github.com/instafluff) as well as [TMI.js](https://github.com/tmijs/tmi.js)

Fonts used [OpenDyslexic](https://github.com/antijingoist/opendyslexic) & [Google Fonts](https://fonts.google.com/): Roboto, Patrick Hand, VT323

Special thanks to [EmmerWhalelord](https://www.twitch.tv/emmer_whalelord) (beta testing, bug hunting, feature request), [Witchking](https://www.twitch.tv/witchking1999) (beta testing) & [Tzantzarel](https://www.twitch.tv/tzantzarel) (helping with 7TV emotes)
