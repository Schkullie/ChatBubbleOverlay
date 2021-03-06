		if (typeof channel === 'undefined' || channel === null ||
			typeof bot === 'undefined' || bot === null ||
			typeof indicator === 'undefined' || indicator === null ||
			typeof namecolor === 'undefined' || namecolor === null ||
			typeof badges === 'undefined' || badges === null ||
			typeof timestamp === 'undefined' || timestamp === null ||
			typeof messages === 'undefined' || messages === null ||
			typeof seconds === 'undefined' || seconds === null )
		{
			document.getElementById('update').innerHTML = "Please update the overlay by downloading the new files over at github.com/Schkullie";
		}
		
		<!-- Creates the array the messages will be stored in -->
		var chat = [];
		var timer = null;
				
				ComfyJS.onChat = ( user, message, flags, self, extra ) => {
				let element = null;
					<!-- Looks for popular chat bots and filters them out -->
				if (user === "StreamElements" || user === "Moobot" || user === "Nightbot" || user === "Streamlabs" || user === bot)
					{
						console.log( "Detected Bot" );
					}
						<!-- Getting the message to the bubble -->
					else
					{
						element = document.getElementById('bubble');

						element.style.opacity = "1";
							<!-- Colors the username the same color as on Twitch -->
						var color = '';
						if(extra.userColor == null){
							color = namecolor;
						}
						else
						{
							color = extra.userColor;
						}
						var usercolor = "<span style=\"color:" + color + "\">" + user + "</span>";

							<!-- Adds badges to the name if enabled in config.js--
						if(badges == 'yes')
							{
								if(!extra.userBadges || Object.keys(extra.userBadges).length === 0)
									{
										
									}
								else
									{
										var values = Object.keys(extra.userBadges);
										
										for (i = values.length; i >= 0; i--) {
											var badgeID = values[i];
											if(badgeID == "broadcaster")
												{
													usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1 \">' + usercolor;
												}
											if(badgeID == "moderator")
												{
													usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1 \">' + usercolor;
												}
											if(badgeID == "subscriber")
												{
													usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/1 \">' + usercolor;
												}
											if(badgeID == "founder")
												{
													usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/511b78a9-ab37-472f-9569-457753bbe7d3/1 \">' + usercolor;
												}
											if(badgeID == "vip")
												{
													usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/1 \">' + usercolor;
												}
											if(badgeID == "premium")
												{
													usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/1 \">' + usercolor;
												}
									}
								}
							}
				
							<!-- Converts Emotes text into pictures -->
						if(!extra.messageEmotes || Object.keys(extra.messageEmotes).length === 0)
							{
								emotes = message;
							}
						else
							{
								let vals = Object.values(extra.messageEmotes);
								let keys = Object.keys(extra.messageEmotes);
								
								var Namote = {};
								var emotestring = '';
								var emotetext = '';
								
								var i = 0;
								for (i = 0; i < keys.length; i++) {
									var emoteID = keys[i];
									var pos = vals[i];
									var string = String(pos);
									matches = string.match(/\d+/g); 
									var pos1 = matches[0];
									var pos2 = matches[1];
									emotetext = message.substring(pos1, parseInt(pos2, 10) + 1);
									emotestring += emotetext + '|';
									Namote[emotetext] = "<img src=\"https://static-cdn.jtvnw.net/emoticons/v1/" + emoteID + "/1.0\">";
								}
									newStr = emotestring.substring(0, emotestring.length - 1);
									function escapeRegExp(emotetext) {
										return emotetext.replace(/[\-\[\]\{\}\(\)\*\+\?\.\^\$]/g, "\\$&");
									}
									emotestring2 = RegExp(escapeRegExp(newStr), 'g');
									emotes = message.replace(emotestring2, function(matched){ return Namote[matched]; });
							}
					
						<!-- Adds a the current time to the start of message and gives it to array -->
					if(timestamp == 'yes')
					{
						var today = new Date();
						
						if(today.getHours() < 10)
						{
							hours = '0' + today.getHours();
						}
						else
						{
							hours = today.getHours();
						}
						if(today.getMinutes() < 10)
						{
							minutes = '0' + today.getMinutes();
						}
						else
						{
							minutes = today.getMinutes();
						}
						
						var time = hours + ":" + minutes;
						chat.push(time + " " + usercolor + ": " + emotes);
					}

					else
					{
						chat.push(usercolor + ": " + emotes);
					}
					
					var text = "";
					var i;
					
							<!-- initiates the loop -->
						for (i = 0; i < chat.length; i++) {
								<!-- if there are less then 3 messages in the array, they just get shown -->
							if (i < parseInt(messages, 10))
							{
									<!-- adds the chat message and a break to the array -->
								text += chat[i] + "<br>"; 
									<!-- pushes outcome to HTML code -->
								document.getElementById("chat").innerHTML = text;
							}
							
								<!-- if there's more than 3 messages in the array only the last 3 recent ones are shown  -->
							else
							{
									<!-- Looks for all values of i which are bigger than the total number of chat masseges send in the array minus 3  -->
								function Function(value, index, array) {
								return index > i-parseInt(messages, 10);
								}
									<!-- filters the array with the fuction -->
								var short = chat.filter(Function);
									<!-- converts the array items into string to  able to be used in replace() -->
								var string = String(short);
									<!-- Replace for Firefox -->
								<!-- var newshort = string.replaceAll(",", "<br>"); --> 
									<!-- Replace for Chromium (which OBS uses) since ReplaceAll() is not yet supportet -->
								var newshort = string.replace(/,/g, "<br>");
									<!-- pushes outcome to HTML code -->
								document.getElementById("chat").innerHTML = newshort;
							}

						}
							<!-- hides bubble if no new messages are added after 15 sec and clears the array -->
						clearTimeout(timer);
						timer = setTimeout(function() {  element.style.opacity = "0"; chat = [];}, parseInt(seconds, 10)*1000);
					}
			}
				<!-- Declaring which channel's chat should be used for the bubble -->
			ComfyJS.Init( channel );
			
	<!-- Let's you choose the side of the triangle indicator -->
	var tri = document.getElementById("triangle");
	var chatstyle = document.getElementById("chat");
	
	if(indicator == 'right')
	{
		tri.style.transform = 'scaleX(-1)';
		chatstyle.style.boxShadow = '-2px 2px 5px';
		tri.style.right = '20px';
		bubble.style.right = '20px';
	}
	else
	{
		chatstyle.style.boxShadow = '2px 2px 5px';
		tri.style.left = '20px';
		bubble.style.left = '20px';
	}