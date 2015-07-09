#!/usr/bin/env bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# Licht aus schalten
echo 0 > ${DIR}/dummy-daten/licht;

#Im Fehlerfall
if [ $? -ne 0 ]
then
  # Nachricht an Stderr
  echo "Zugriff fehlgeschlagen" >&2;
  #Mit Fehlercode beenden
  exit 1;
fi

#erfolgreich beenden
exit 0;