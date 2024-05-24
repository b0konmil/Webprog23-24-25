const fs = require('fs');

if (!fs.existsSync('./zeneszoveg')) {
    fs.mkdir('./zeneszoveg', err => {
      if (err) {
        console.log(err);
      }
      console.log('folder created');
    });
  } else {
    fs.rmdir('./zeneszoveg', err => {
      if (err) {
        console.log(err);
      }
      console.log('folder deleted');
    });
  }

fs.writeFile('szoveg.txt', `Ajlelej
Ajlelejlelejlej
Ajajajajjaaaajjjj
Ezeknél a cigányoknál buli van
(Bulibulibulivan)
Foleg ha a Bodi Csabi itt van
(ittvan ittvan ittvan)
Ezeknél a cigányoknál buli van
(Bulibulibulivan)
Foleg ha a Bodi csalad itt van
(ittvan ittvan ittvan)
Csinald testver az eleted kihasznalod
Egesz ejjel testverekkel bulizok
Ezeknél a cigányoknál buli van
(Bulibulibulivan)
Foleg ha a Bodi Csabi itt van
(ittvan ittvan ittvan)
Ezeknél a cigányoknál buli van
(Bulibulibulivan)
Foleg ha a Bodi csalad itt van
(ittvan ittvan ittvan)
Máma este ti nallatok buli van
(Bulibulibulivan)
Hald az utemet es erezzed amig van
(ittvan ittvan ittvan)
Máma este ti nallatok buli van
(Bulibulibulivan)
Jo a kedvem hogyha minden testver itt van
(ittvan ittvan ittvan)
Csinald testver az eleted kihasznalod
Mert ma este a csaladoddal mulatok
Máma este ti nallatok buli van
(Bulibulibulivan)
Hald az utemet es erezzed amig van
(ittvan ittvan ittvan)
Máma este ti nallatok buli van
(Bulibulibulivan)
Jo a kedvem hogyha minden testver itt van
(ittvan ittvan ittvan)
Csinald testver az eleted kihasznalod
Én ma este ti melletek bulizok
Ezeknél a cigányoknál buli van
(Bulibulibulivan)
Foleg ha a Bodi Csabi itt van
(ittvan ittvan ittvan)
És akkor ezeknel a ciganyoknal buli van buli buli buli van
Foleg hogyha ott tancol egy cuki csaj cuki csaj
Ne mozgasd a labod szarat
Tudom a farod jarasat
hopp titi hopp
Csinald testver az eleted kihasznalod
Mert ma este a csaladoddal mulatok
Máma este ti nallatok buli van
Foleg ha a Bodi csalad itt van
Ajlelej
Ajlelejlelejlej
Ajajajajej`,() => {
    console.log('file was written.')
})

if (fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', err => {
      if (err) {
        console.log(err);
      }
      console.log('file deleted');
    });
  }