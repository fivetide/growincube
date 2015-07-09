#!/usr/bin/env bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# Status auslesen (1 oder 0)
value=`cat ${DIR}/dummy-daten/wasser`;

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