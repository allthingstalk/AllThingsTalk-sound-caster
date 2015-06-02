#!/bin/sh
rfkill unblock bluetooth
sleep 5
echo -e "connect 33:33:99:74:FC:89\n" | bluetoothctl
sleep 5
pactl set-default-sink bluez_sink.33_33_99_74_FC_89
