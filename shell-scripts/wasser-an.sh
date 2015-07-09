#!/usr/bin/env bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# Flutung beginnen
echo 1 > ${DIR}/dummy-daten/wasser;

#Im Fehlerfall
if [ $? -ne 0 ]
then
  # Nachricht an Stderr
  echo "Zugriff fehlgeschlagen" >&2;
  #Mit Fehlercode beenden
  exit 1;
fi

# Dauert 5 Sekunden oder so
sleep 5;

#Im Fehlerfall
if [ $? -ne 0 ]
then
  # Nachricht an Stderr
  echo "Fehler bei der durchführung" >&2;
  #Mit anderem Fehlercode beenden
  exit 2;
fi

# Flutung beendet
echo 0 > ${DIR}/dummy-daten/wasser;


#erfolgreich beenden
exit 0;