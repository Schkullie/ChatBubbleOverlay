# Twitch Chat Bubble Overlay

![Example](https://i.ibb.co/sswZ8GX/image.gif)

This is a dynamic chat overlay in the shape of a speach bubble.

I was getting tired of static non-aestetic looking chat overlays and wanted something new.

The outcome is this overlay, you can use and configure however you like.

</br>

I built this Chat overlay live on my stream!

> https://twitch.tv/schkullie

If you like this overlay and want to support me, you can 
> [Buy me a coffee](https://streamlabs.com/schkullie/tip)

</br>

**Credits:**

This overlay is only possible thanks to [ComfyJS](https://github.com/instafluff/ComfyJS) made by [@Instafluff](https://github.com/instafluff)

The default font used is [OpenDyslexic](https://www.opendyslexic.org/) and was choosen to be more inclusive by improving readability & accessibility

**Tutorial:**
[![Tutorial](https://img.youtube.com/vi/.../hqdefault.jpg)](https://www.youtube.com/)

## Schkullie ##
I'm new to coding and this is a side thing I do, but I try my best to make stuff that's usefull for everybody

I sometimes stream coding, but mainly I do music on stream
> https://twitch.tv/schkullie

## Setup ##
1. Download all the files and extract them somewhere on your PC

2. Open the ``config.js`` with an text editor (Notepad++ is recommended)

   1. Replace Schkullie with your own Twitch-username (don't delete the ``""`` or it will not work)

   2. Edit all the other parameters to your liking

   3. (If you want to change the Font, open ``chat bubble.css`` in an editor and replace ``OpenDyslexic`` after the second ``font-family:`` with the name of your prefered Google font) (don't delete the ``''`` or it will not work)

3. Add the ``chat bubble.html`` as a browser source to OBS and make sure to enable the last option "refresh browser when scene becomes active" to avoid any problems in the future (this will however remove any active chat, so disable it if you want chat to carry over from another scene)
