		if(mode == 'darkmode')
		{
			document.getElementById('svg').style.fill = '#18181b';
			document.getElementById('chat').style.backgroundColor = '#18181b';
			document.getElementById('chat').style.color = 'white';
			function changetoDarkmode() {
				var cols = document.getElementsByClassName('pronoun');
				for(i = 0; i < cols.length; i++) {
					cols[i].style.color = 'white';
					cols[i].style.border = '1px solid white';
				}
			}
		}

		if(mode == 'custom')
		{
			document.getElementById('svg').style.fill = customBG;
			document.getElementById('chat').style.backgroundColor = customBG;
			document.getElementById('chat').style.color = CustomColor;
			function changetoCustommode() {
				var cols = document.getElementsByClassName('pronoun');
				for(i = 0; i < cols.length; i++) {
					cols[i].style.color = CustomColor;
					cols[i].style.border = '1px solid ' + CustomColor;
				}
			}
		}

		if(TextOnly == 'yes') {
			document.getElementById('svg').style.fill = 'rgba(0,0,0,0.0)';
			document.getElementById('chat').style.backgroundColor = 'rgba(0,0,0,0.0)';
			bubble.style.filter = 'drop-shadow(0px 0px 0px rgba(0,0,0,0.0)';
		}
		
		//chat moderation tools
		const client = new tmi.Client({
			connection: {
			reconnect: true,
			secure: true
			},
			channels: [channel],
		});
		client.connect();
		
		client.on("clearchat", (channel) => {
				console.log('chat cleared');
				chat = [];
				queue = [];
				currentMessage = [];
				document.getElementById("chat").innerHTML = '';
				document.getElementById("bubble").style.opacity = "0"
			});
			
		client.on("messagedeleted", (channel, username, deletedMessage, userstate) => {
			for(i = 0; i < collection.length; i++) {
				if (collection[i].user.toLowerCase() == username && collection[i].message == deletedMessage) {
					collection.splice(i, 1);
					handleModeration();
					console.log('message of ' + username + ' deleted');
				}
			}
		});

		client.on("timeout", (channel, username, reason, duration, userstate) => {
			for(i = 0; i < collection.length; i++) {
				if (collection[i].user.toLowerCase() == username) {
					collection.splice(i, 1);
					i = -1; continue;
				}
			}
			handleModeration();
			console.log(username + ' timeouted');
		});
		
		client.on("ban", (channel, username, reason, userstate) => {
			for(i = 0; i < collection.length; i++) {
				if (collection[i].user.toLowerCase() == username) {
					collection.splice(i, 1);
					i = -1; continue;
				}
			}
			handleModeration();
			console.log(username + ' timeouted');
		});		
		
		function handleModeration() {
			show = [];
			if(collection.length - messages < 0) {
				for(j = 0; j < collection.length; j++) {
					show.push(collection[j].processed)
				}
			} else {
				for(j = 0; j < messages; j++) {
					show.push(collection[j].processed)
				}
			}
			chatString = "" ;
			for (j = 0; j < show.length; j++) {
				chatString += String(show[j]) + "<br>";
			}
			document.getElementById("chat").innerHTML = chatString;
			if(mode == 'darkmode') {
				changetoDarkmode();
			}
			if(mode == 'custom') {
				changetoCustommode();
			}
			if(collection.length === 0) {
				document.getElementById("bubble").style.opacity = "0";
				collection = [];
				queue = []; 
				id = 1;
			}
		}

		//FFZ & BTTV API
		var SubBadges = {};
		var FFZchannelemoticons = {};
		var FFZglobalemoticons = {};
		var BTTVchannelemoticons = {};
		var BTTVglobalemoticons = {};
		
		//API calling
		fetch("https://api.frankerfacez.com/v1/room/" + channel.toLowerCase())
			.then(res => {return res.json()})
			.then(data => {return fetch("https://api.frankerfacez.com/v1/set/" + data.room.set);})
			.then(res => {return res.json()})
			.then(out => {FFZchannelemoticons = out})
			.catch(err => { throw err});			
		fetch("https://api.betterttv.net/3/cached/users/twitch/" +  twitch_id)
			.then(res => {return res.json()})
			.then(out => {BTTVchannelemoticons = out})
			.catch(err => { throw err});
		fetch("https://api.betterttv.net/3/cached/emotes/global")
			.then(res => {return res.json()})
			.then(out => {BTTVglobalemoticons = out})
			.then(nope => {return fetch("https://api.frankerfacez.com/v1/set/global");})
			.then(res => {return res.json()})
			.then(out => {FFZglobalemoticons = out})
			.catch(err => { throw err});
		fetch("https://badges.twitch.tv/v1/badges/channels/" + twitch_id + "/display")
			.then(res => {return res.json()})
			.then(out => {SubBadges = out})
			.catch(err => { throw err});
		
		var moderation = [];
		var timer = null;
		var pronounCache = [];
		var queue = [];
		var collection = [];
		var id = 1;
		
		ComfyJS.onChat = ( user, message, flags, self, extra ) => {
			if(pronouns == 'yes') {
				processPronouns(message, user, extra, FFZchannelemoticons, BTTVchannelemoticons, BTTVglobalemoticons);
			}
			else{
				pronounsAPI = '';
				processMessage(message, user, extra, pronounsAPI, FFZchannelemoticons, BTTVchannelemoticons, BTTVglobalemoticons);
			}
		}

		if(commands == 'yes') {
			ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
				message = '!' + command + ' ' + message;
				if(pronouns == 'yes') {
					processPronouns(message, user, extra, FFZchannelemoticons, BTTVchannelemoticons, BTTVglobalemoticons);
				}
				else{
					pronounsAPI = '';
					processMessage(message, user, extra, pronounsAPI, FFZchannelemoticons, BTTVchannelemoticons, BTTVglobalemoticons);
				}
			}
		}
		ComfyJS.Init( channel );
			
		//Sets the side of the triangle indicator
		var tri = document.getElementById("triangle");
		
		if(indicator == 'right')
		{
			tri.style.transform = 'scaleX(-1)';
			bubble.style.filter = 'drop-shadow(-2px 2px 5px rgba(0, 0, 0, 0.6)';
			tri.style.right = '-10px';
			bubble.style.right = '20px';
		}
		else
		{
			bubble.style.filter = 'drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.6)';
			tri.style.left = '10px';			
		}
		
		//stylize the chat overlay
		document.body.style.fontFamily = font;
		document.body.style.fontSize = fontSize + 'px';

		function processPronouns(message, user, extra, FFZchannelemoticons, BTTVchannelemoticons, BTTVglobalemoticons){
			pronounFilter = pronounCache.filter(function (x) {return x.name == user});
				//check for pronouns in cache
			if(pronounFilter.length !== 0) {
				console.log('pronouns in cache');
				pronounsAPI = pronounFilter[0].pronounsAPI
				processMessage(message, user, extra, pronounsAPI, FFZchannelemoticons, BTTVchannelemoticons, BTTVglobalemoticons);
			}
			else {
				async function fetchPronouns() {
					const res = await fetch("https://pronouns.alejo.io/api/users/" + user.toLowerCase());
					var pronounsAPI = await res.json();
					if(pronounsAPI.length !== 0){
						pronounCache.push({"name": user , pronounsAPI});
						console.log('pronouns retrived');
					}
					else{
						pronounCache.push({"name": user , "pronounsAPI": ''});
					}
					processMessage(message, user, extra, pronounsAPI, FFZchannelemoticons, BTTVchannelemoticons, BTTVglobalemoticons);
				}
				fetchPronouns();
			}
		}

		function processMessage(message, user, extra, pronounsAPI, FFZchannelemoticons, BTTVchannelemoticons, BTTVglobalemoticons){
				let element = null;

					// Looks for popular chat bots and filters them out 
				if (filterBots == 'yes' && user === "StreamElements" || user === "Moobot" || user === "Nightbot" || user === "Streamlabs" || user.toLowerCase() == bot.toLowerCase())
				{
					console.log( "Detected Bot" );
				}
					//Getting the message to the bubble
				else
				{
						//Colors the username the same color as on Twitch
					var color = '';
					if(extra.userColor == null){
						color = namecolor;
					}
					else
					{
						color = extra.userColor;
					}
					var usercolor = "<span style=\"color:" + color + "\">" + user + "</span>";
					
					if(pronouns == 'yes'){
						pronounsID = ['hehim', 'any', 'aeaer', 'eem', 'faefaer', 'heshe', 'hethem', 'itits', 'other', 'perper', 'sheher', 'shethem', 'theythem', 'vever', 'xexem', 'ziehir'];
						pronounsText = ['He/Him', 'Any', 'Ae/Aer', 'E/Em', 'Fae/Faer', 'He/She', 'He/They', 'It/Its', 'Other', 'Per/Per', 'She/Her', 'She/They', 'They/Them', 'Ve/Ver', 'Xe/Xem', 'Zie/Hir'];
						if(pronounsAPI.length == 0)
						{
							usercolor = usercolor;
							console.log("No pronouns");
						}
						else
						{
							for (i = 0; i < pronounsID.length; i++) {
								if(pronounsAPI[0].pronoun_id == pronounsID[i])
								{
									usercolor = '<span class=pronoun>' + pronounsText[i] + '</span>' + usercolor;
									break
								}
							}
						}
					}
					
						// Adds badges to the name if enabled in config.js--
					if(badges == 'yes')
					{
						if(!extra.userBadges || Object.keys(extra.userBadges).length === 0)
							{
								console.log('No user badge');
							}
						else {
								var values = Object.keys(extra.userBadges);
								for (i = values.length; i >= 0; i--) {
									var badgeID = values[i];
									if(badgeID == "broadcaster") {
										usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1 \">' + usercolor;
									}
									if(badgeID == "moderator") {
										usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1 \">' + usercolor;
									}
									if(badgeID == "partner") {
										usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/1 \">' + usercolor;
									}
									if(badgeID == "staff") {
										usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/1 \">' + usercolor;
									}	
									if(badgeID == "founder") {
										usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/511b78a9-ab37-472f-9569-457753bbe7d3/1 \">' + usercolor;
									}
									if(badgeID == "vip") {
										usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/1 \">' + usercolor;
									}
									if(badgeID == "premium") {
										usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/1 \">' + usercolor;
									}
									if(badgeID == "artist-badge") {
										usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/4300a897-03dc-4e83-8c0e-c332fee7057f/1 \">' + usercolor;
									}
									if(badgeID == "no_audio") {
										usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/aef2cd08-f29b-45a1-8c12-d44d7fd5e6f0/1 \">' + usercolor;
									}
									if(badgeID == "no_video") {
										usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/199a0dba-58f3-494e-a7fc-1fa0a1001fb8/1 \">' + usercolor;
									}
									if(badgeID == 'sub-gifter') {
										GiftAmount = ['1', '5', '10', '25', '50', '100', '250', '500', '1000'];
										GiftedLinks = ['https://static-cdn.jtvnw.net/badges/v1/f1d8486f-eb2e-4553-b44f-4d614617afc1/1', 
														'https://static-cdn.jtvnw.net/badges/v1/3e638e02-b765-4070-81bd-a73d1ae34965/1',
														'https://static-cdn.jtvnw.net/badges/v1/bffca343-9d7d-49b4-a1ca-90af2c6a1639/1', 
														'https://static-cdn.jtvnw.net/badges/v1/17e09e26-2528-4a04-9c7f-8518348324d1/1',
														'https://static-cdn.jtvnw.net/badges/v1/47308ed4-c979-4f3f-ad20-35a8ab76d85d/1',
														'https://static-cdn.jtvnw.net/badges/v1/5056c366-7299-4b3c-a15a-a18573650bfb/1',
														'https://static-cdn.jtvnw.net/badges/v1/df25dded-df81-408e-a2d3-40d48f0d529f/1',
														'https://static-cdn.jtvnw.net/badges/v1/f440decb-7468-4bf9-8666-98ba74f6eab5/1',
														'https://static-cdn.jtvnw.net/badges/v1/b8c76744-c7e9-44be-90d0-08840a8f6e39/1'];
										for (j = 0; j < GiftAmount.length; j++) {
											if(extra.userBadges['sub-gifter'] == GiftAmount[j]) {
												usercolor = '<img src=\"' + GiftedLinks[j] + '\">' + usercolor;
												break;
											}
										}
									}
									if(badgeID == 'bits') {
										BitsAmount = ['1', '100', '1000', '5000', '10000', '25000', '50000', '75000', '100000', '200000', '300000', '400000', '500000', '600000', '700000', '800000', '900000', '1000000'];
										BitLinks = ['https://static-cdn.jtvnw.net/badges/v1/73b5c3fb-24f9-4a82-a852-2f475b59411c/1',
													'https://static-cdn.jtvnw.net/badges/v1/09d93036-e7ce-431c-9a9e-7044297133f2/1',
													'https://static-cdn.jtvnw.net/badges/v1/0d85a29e-79ad-4c63-a285-3acd2c66f2ba/1',
													'https://static-cdn.jtvnw.net/badges/v1/57cd97fc-3e9e-4c6d-9d41-60147137234e/1',
													'https://static-cdn.jtvnw.net/badges/v1/68af213b-a771-4124-b6e3-9bb6d98aa732/1',
													'https://static-cdn.jtvnw.net/badges/v1/64ca5920-c663-4bd8-bfb1-751b4caea2dd/1',
													'https://static-cdn.jtvnw.net/badges/v1/62310ba7-9916-4235-9eba-40110d67f85d/1',
													'https://static-cdn.jtvnw.net/badges/v1/ce491fa4-b24f-4f3b-b6ff-44b080202792/1',
													'https://static-cdn.jtvnw.net/badges/v1/96f0540f-aa63-49e1-a8b3-259ece3bd098/1',
													'https://static-cdn.jtvnw.net/badges/v1/4a0b90c4-e4ef-407f-84fe-36b14aebdbb6/1',
													'https://static-cdn.jtvnw.net/badges/v1/ac13372d-2e94-41d1-ae11-ecd677f69bb6/1',
													'https://static-cdn.jtvnw.net/badges/v1/a8f393af-76e6-4aa2-9dd0-7dcc1c34f036/1',
													'https://static-cdn.jtvnw.net/badges/v1/f6932b57-6a6e-4062-a770-dfbd9f4302e5/1',
													'https://static-cdn.jtvnw.net/badges/v1/4d908059-f91c-4aef-9acb-634434f4c32e/1',
													'https://static-cdn.jtvnw.net/badges/v1/a1d2a824-f216-4b9f-9642-3de8ed370957/1',
													'https://static-cdn.jtvnw.net/badges/v1/5ec2ee3e-5633-4c2a-8e77-77473fe409e6/1',
													'https://static-cdn.jtvnw.net/badges/v1/088c58c6-7c38-45ba-8f73-63ef24189b84/1',
													'https://static-cdn.jtvnw.net/badges/v1/494d1c8e-c3b2-4d88-8528-baff57c9bd3f/1']
										if(SubBadges.badge_sets.bits == null)
										{
											for (j = 0; j < BitsAmount.length; j++) {
												if(extra.userBadges.bits == BitsAmount[j]) {
													usercolor = '<img src=\"' + BitLinks[j] + '\">' + usercolor;
													break;
												}
											}
										}
										else
										{
											for (j = 0; j < BitsAmount.length; j++) {
												if(extra.userBadges.bits === BitsAmount[j])
												{
													var num = BitsAmount[j];
													usercolor = '<img src=' + SubBadges.badge_sets.bits.versions[num].image_url_1x + '>' + usercolor;
													break;
												}
											}
										}
									}
									if(badgeID == "subscriber") {
										BadgeAge = ['0', '2', '3', '6', '9', '12', '18', '24', '36', '2000', '2002', '2003', '2006', '2009', '2012', '2018', '2024', '2036', '3000', '3002', '3003', '3006', '3009', '3012', '3018', '3024', '3036'];
										if(SubBadges.badge_sets.subscriber == null)
										{
											usercolor = '<img src=\"https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/1 \">' + usercolor;
										}
										else
										{
											for (j = 0; j < BadgeAge.length; j++) {
												if(extra.userBadges.subscriber === BadgeAge[j])
												{
													var num = BadgeAge[j];
													usercolor = '<img src=' + SubBadges.badge_sets.subscriber.versions[num].image_url_1x + '>' + usercolor;
													break;
												}
											}
										}
									}
								}
							}
						}
					
						// Converts message text into emote pictures 
					if(!extra.messageEmotes || Object.keys(extra.messageEmotes).length === 0) {
							emotes = message;
						}
					else {
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
								Namote[emotetext] = "<img src=\"https://static-cdn.jtvnw.net/emoticons/v2/" + emoteID + "/default/dark/1.0\">";
							}
								newStr = emotestring.substring(0, emotestring.length - 1);
								function escapeRegExp(emotetext) {
									return emotetext.replace(/[\-\[\]\{\}\(\)\*\+\?\.\^\$]/g, "\\$&");
								}
								emotestring2 = RegExp(escapeRegExp(newStr), 'g');
								emotes = message.replace(emotestring2, function(matched){ return Namote[matched]; });
						}
						
						if(thirdParty=='yes')
						{
								//FFZ
							if(FFZchannelemoticons.set !== undefined) {
								let FFZvals = Object.values(FFZchannelemoticons.set.emoticons);
								for (i = 0; i < FFZchannelemoticons.set.emoticons.length; i++) {
									var FFZname =FFZvals[i].name;
									var re = new RegExp(`\\b${FFZname}\\b`, 'g');
									emotes = emotes.replace(re ,"<img src=\"https://cdn.frankerfacez.com/emote/" + FFZvals[i].id + "/1\">");
								}
							}
							
							let FFZglobalvals = Object.values(FFZglobalemoticons.sets[3].emoticons);
							for (i = 0; i < FFZglobalemoticons.sets[3].emoticons.length; i++) {
								var FFZname =FFZglobalvals[i].name;
								var re = new RegExp(`\\b${FFZname}\\b`, 'g');
								emotes = emotes.replace(re ,"<img src=\"https://cdn.frankerfacez.com/emote/" + FFZglobalvals[i].id + "/1\">");
							}
							
								//BTTV
							if(BTTVchannelemoticons.channelEmotes !== undefined && BTTVchannelemoticons.sharedEmotes !== undefined) {
								let BTTVvals = Object.values(BTTVchannelemoticons.channelEmotes);
								let BTTVsharedvals = Object.values(BTTVchannelemoticons.sharedEmotes);
																
								for (i = 0; i < BTTVchannelemoticons.channelEmotes.length; i++) {
									var BTTVname =BTTVvals[i].code;
									var re = new RegExp(`\\b${BTTVname}\\b`, 'g');
									emotes = emotes.replace(re ,"<img src=\"https://cdn.betterttv.net/emote/" + BTTVvals[i].id + "/1x\">");
								}
								for (i = 0; i < BTTVchannelemoticons.sharedEmotes.length; i++) {
									var BTTVname = BTTVsharedvals[i].code;
									var re = new RegExp(`\\b${BTTVname}\\b`, 'g');
									emotes = emotes.replace(re ,"<img src=\"https://cdn.betterttv.net/emote/" + BTTVsharedvals[i].id + "/1x\">");
								}
							}
							
							let BTTVglobalvals = Object.values(BTTVglobalemoticons);
							for (i = 0; i < BTTVglobalemoticons.length; i++) {
								var BTTVname = BTTVglobalvals[i].code;
								var re = new RegExp(`\\b${BTTVname}\\b`, 'g');
								emotes = emotes.replace(re ,"<img src=\"https://cdn.betterttv.net/emote/" + BTTVglobalvals[i].id + "/1x\">");
							}								
						}
				
						// Adds a the current time to the start of message and gives it to array					
					if(timestamp == 'yes')
					{
						var today = new Date();
						
						if(today.getHours() < 10) {
							hours = '0' + today.getHours();
						}
						else{
							hours = today.getHours();
						}
						if(today.getMinutes() < 10)	{
							minutes = '0' + today.getMinutes();
						}
						else {
							minutes = today.getMinutes();
						}
					
						var time = hours + ":" + minutes;
						chat = String(time + " " + usercolor + ": " + emotes);
					}

					else {
						chat = String(usercolor + ": " + emotes);
					}

					collection.push({"id": String(id), "user": String(user), "message": String(message), "processed": String(chat)})
						//technically not really needed
					queue.push(String(id));
					id += 1						

					setTimeout(function() {
						pos = parseInt(queue[0]);
						check = pos - messages;
						show = [];
						if(check < 1) {
							if(collection.length - pos < 0) {
								for(j = 0; j < collection.length; j++) {
									show.push(collection[j].processed)
								}
							} else {
								for(i = 0; i < pos; i++) {
									show.push(collection[i].processed)
								}
							}
							chatString = "" ;
							for (i = 0; i < show.length; i++) {
								chatString += String(show[i]) + "<br>";
							}
							document.getElementById("chat").innerHTML = chatString;
							queue.splice(0, 1);
						} else {
							collection.splice(0, 1);
							if(collection.length - messages < 0) {
								for(j = 0; j < collection.length; j++) {
									show.push(collection[j].processed)
								}
							} else {
								for(j = 0; j < messages; j++) {
									show.push(collection[j].processed)
								}
							}
							chatString = "" ;
							for (i = 0; i < show.length; i++) {
								chatString += String(show[i]) + "<br>";
							}
							document.getElementById("chat").innerHTML = chatString;
							queue.splice(0, 1);
						}

						element = document.getElementById('bubble');
						element.style.opacity = "1";
						element.style.animation = "pop-in reverse .5s";
	
							//if only for avoiding error in console. Not needed perse.
						if(mode == 'darkmode') {
							changetoDarkmode();
						}
						if(mode == 'custom') {
							changetoCustommode();
						}					
							//checks for height, so content doesn't get cut & deletes oldest message from chat array
						let box = document.querySelector('#chat');
						let windowHeight = document.body.clientHeight;
						let chatHeight = box.clientHeight;
						if( chatHeight + 58 > windowHeight){
							collection.splice(0, 1);
							chatString = "" ;
							for (i = 0; i < messages; i++) {
								chatString += String(collection[i]) + "<br>"
							}
							document.getElementById("chat").innerHTML = chatString;
							if(chat.length == 0) {
								element = document.getElementById('bubble');
								element.style.animation = "pop-out .5s";
								element.style.opacity = "0";
							}
						}
							//hides bubble if no new messages are added after defined amount of sec and clears the array
						if(seconds !== 0) {
							clearTimeout(timer);
							timer = setTimeout(function() {  element.style.animation = "pop-out .5s"; element.style.opacity = "0"; collection = []; queue = []; id = 1}, parseInt(seconds, 10)*1000);
						}
					}, wait * 1000);
				}
			}