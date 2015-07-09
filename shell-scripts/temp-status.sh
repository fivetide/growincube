#!/usr/bin/env bash

# Status auslesen (zB 24.3)
precomma=$(( 20 + ($RANDOM % 10))); 
postcomma=$((($RANDOM % 10))); 
value=$(echo "$precomma+ $postcomma / 10" | bc -l);

#Im Fehlerfall
if [ $? -ne 0 ]
then
  # Nachricht an Stderr
  echo "Zugriff fehlgeschlagen" >&2;
  #Mit Fehlercode beenden
  exit 1;
fi

#erfolgreich beenden
echo "$value";
exit 0;