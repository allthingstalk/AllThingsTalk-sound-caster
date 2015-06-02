### Smart Living 4G Sound Caster

#### Info

4G Sound Caster is prototype sound streaming device connected to the cloud. Idea behind this nifty device is to take of the battery load of your mobile phone for audio stream and to allow multiple user interaction with sound streaming.

Device is preseted with audio stream but you can change the stream url.

	- Currently supported streams: OGG streams 

You can change the volume of the stream.

Device is equiped with motion detecting setup. You can use it to play music when device detects motion.

Core component of the prototype is Intel Edison and SmartLiving cloud support.

#### What you need

First of all you will need some hardware.

	- Intel Edison dev board
	- Bluetooth speaker or headphones
	- 2 micro USB cabels
	- GrooveShield for Arduino (optional)
	- Groove PIR motion sensor (optional)

And you will need account on https://beta.smartliving.io/


#### How To

1. Clone this repository.
2. You will need an account on https://beta.smartliving.io/ so register and sign in.
3. Create new device, choose Intel Edison and name it '4G Sound Caster'.
4. Click on the newly created device
5. In your console/terminal input `npm install smartliving`
6. When you install library, copy and paste credentials provided on platform into your credentials.json file inside the '4G Sound Caster' project
7. Open '4G Sound Caster' project in Intel XDK, connect your Intel Edison and upload the project

#### Aditional Setup

Connect your Edison to internet.

Connect your bluetooth device to Intel Edison. You can do this with few simple commands.

	- Connect your Intel Edison through serial connection
	- Enter these commands

	    rfkill unblock bluetooth
        bluetoothctl
    
    - Pair and connect your bluetooth device 

You are good to go. Control and play your 4G Sound Caster device with SmartLiving platform and enjoy the music!

#### Alternative

If you want to enable your Sound Caster to auto connect to your bluetooth device we included two files `startup.sh` and `bluez_autostart.service` in project. Just follow these steps to enable the autoconnect feature
	
	- Place bluez_autostart.service in /lib/systemd/system on Intel Edison
	- In startup.sh change the bluetooth device mac adress with the mac adress of your device
	- Place startup.sh in /home/root on Intel Edison
	- enter this command `enable bluetooth autostart`
	- enter this command `systemctl enable bluez_startup`

If needed, check the service log with this command: `systemctl status bluez_startup`