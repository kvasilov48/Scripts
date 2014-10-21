#!/bin/bash

apt-get -y install tcl

nano /etc/init.d/bootlogs
#now search and edit:

#uname -snrvm > /var/run/motd
#[ -f /etc/motd.tail ] && cat /etc/motd.tail >> /var/run/motd
#to
##uname -snrvm > /var/run/motd
##[ -f /etc/motd.tail ] && cat /etc/motd.tail >> /var/run/motd

wget https://github.com/iptoux/dyMotd/tarball/master
mkdir /etc/srvtls/motd 
tar xf iptoux-dyMotd-6348e8d.tar.tar

#If /etc/srvtls dosn't exists, create it, to get archivname type ls in console.
mv .config /etc/srvtls/motd/.config
mv statement /etc/srvtls/motd/statement
mv motd.tcl /etc/motd.tcl

nano /etc/srvtls/motd/.config
nano /etc/srvtls/motd/statement

echo "" > /etc/motd.tail

cat >> /etc/profile <<EOF
clear
/etc/motd.tcl
<<EOF

#Optional
cat >> /etc/bash.bashrc <<EOF
clean ()
{
    clear && /etc/./motd.tcl
}
EOF
