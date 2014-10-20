#!/bin/bash

cat > .install-exclude <<EOF
/dev/*
/proc/*
/sys/*
/media/*
/home/*
/mnt/*
/run/*
/tmp/*
/boot/*
/root/*
EOF
mkfs.ext4 /dev/sda2
cat > /etc/fstab <<EOF
/dev/sda1 swap swap defaults 0 0
/dev/sda2 / ext4 defaults,noatime,nodiratime,data=writeback,commit=600,errors=remount-ro 0 0
/dev/sda3 /home ext4 defaults,errors=remount-ro 0 0
EOF
mount /dev/sda2 /mnt
sed -e 's,root=\/dev\/mmcblk0p1,root='"/dev/sda2"',g' -i /boot/uEnv.ct
rsync -aH --exclude-from=.install-exclude  /  /mnt
dd if=/dev/zero of=/dev/sda1 bs=1024 count=1024K
mkswap /dev/sda1
swapon /dev/sda1
umount /mnt
sleep 5
rm .install-exclude
reboot
