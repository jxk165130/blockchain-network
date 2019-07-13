To repackage the bna file:
    1. Enter project folder 
    2. Type:
        composer archive create -a dist/accredilinkScreen.bna --sourceType dir --sourceName .
    Note: The dist/accredilinkScreen.bna is where the file will be stored with accredilinkScreen being the file name

Go to fabric-tools folder and create a peeradmincard.sh if you haven't
Download BNA file if it is not in the folder

To install follow the steps. This requires hyperledger and composer to be installed in the system
NOTE: IF ALREADY INSTALLED Start at step 3 if bna is already installed, if there are errors encountered, start from step 1.
    1. start the fabric if you haven't:
            ./startFabric.sh
    2. type to install bna:
            composer network install -a accredilinkScreen.bna -c PeerAdmin@hlfv1
    3. then start the network:
            composer network start -n accredilinknet -V 0.0.1 -A admin -S adminpw -c PeerAdmin@hlfv1
        NOTE: The version number is found in the package.json file of the project
    4. Use the card generated if not yet importerd, otherwise skip this step
            composer card import -f admin@accredilinknet.card
    5. run:
            composer-rest-server -c admin@accredilinknet -n always -w true

