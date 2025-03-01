const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function soal1() {
    const distance = 1000;
    let aliTime = 0;
    let aliSpeed = 2;
    let aliDistance = 0;
    let timeSegment = 10;
    
    let baduSpeed = 3;
    let baduStartTime = 60; // Badu mulai setelah 1 menit (60 detik)
    let baduDistance = 0;
    let baduTime = baduStartTime;
    
    console.log("\nHasil Soal 1:");
    console.log("Waktu (detik) | Kecepatan Ali (m/s) | Kecepatan Badu (m/s)");
    while (baduDistance < aliDistance || aliDistance < distance) {
        // Ali bergerak
        let aliSegmentDistance = aliSpeed * timeSegment;
        if (aliDistance + aliSegmentDistance > distance) {
            aliTime += (distance - aliDistance) / aliSpeed;
            aliDistance = distance;
        } else {
            aliDistance += aliSegmentDistance;
            aliTime += timeSegment;
            aliSpeed += 0.1;
        }
        
        // Badu bergerak
        let baduSegmentDistance = baduSpeed * timeSegment;
        if (baduDistance + baduSegmentDistance > distance) {
            baduTime += (distance - baduDistance) / baduSpeed;
            baduDistance = distance;
        } else {
            baduDistance += baduSegmentDistance;
            baduTime += timeSegment;
        }
        
        console.log(`${aliTime.toFixed(0).padStart(5, ' ')}         | ${aliSpeed.toFixed(1).padStart(12, ' ')}        | ${baduSpeed.toFixed(1).padStart(12, ' ')}`);
        
        // Cek kapan Badu melewati Ali
        if (baduDistance >= aliDistance) {
            let totalSeconds = baduTime;
            let hours = 8 + Math.floor(totalSeconds / 3600);
            let minutes = Math.floor((totalSeconds % 3600) / 60);
            let seconds = Math.round(totalSeconds % 60);
            
            console.log(`Badu mendahului Ali pada pukul ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            break;
        }
    }

    backToMenu();
}

function soal2() {
    const distance = 1000;
    let aliTime = 0;
    let aliSpeed = 2;
    let aliDistance = 0;
    let baduSpeed = 3;
    let baduStartTime = 10; // Badu mulai setelah 10 detik
    let baduDistance = 0; // Badu mulai dari 0 meter

    let time = 0; // Waktu total

    while (aliDistance + baduDistance < distance) {
        // Pergerakan Ali
        aliDistance += aliSpeed;
        aliSpeed += 0.1;
        aliTime++;
        time++;

        // Pergerakan Badu
        if (time >= baduStartTime) {
            baduDistance += baduSpeed;
        }
    }

    let totalSeconds = time;
    let hours = 8 + Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    console.log("\nHasil Soal 2:");
    console.log(`Ali dan Badu berpapasan pada pukul ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    console.log(`Jarak Badu dari titik B saat berpapasan: ${(distance - baduDistance).toFixed(2)} meter`);
    backToMenu();
}

function backToMenu() {
    rl.question('\nKembali ke menu utama? (y/t): ', (answer) => {
        if (answer.toLowerCase() === 'y') {
            showMenu();
        } else {
            console.log('Terima kasih!');
            rl.close();
        }
    });
}

function showMenu() {
    console.log("+=========================================+");
    console.log("| NIM: 2411601129                         |");
    console.log("| Nama: Reno Finsa Albi                   |");
    console.log("| UAS - Perancangan dan Analisa Algoritma |");
    console.log("+=========================================+");
    console.log("\nPilih soal yang ingin dijalankan:\n");
    console.log("1. Soal 1");
    console.log(`
    Jarak titik A dan titik B 1000 m.
    Ali berangkat dari titik A ke titik B pukul 08:00:00
    dengan kecepatan sebagai berikut:
      - 10 detik pertama kecepatannya 2 m per detik.
      - 10 detik berikutnya kecepatan naik menjadi 2.1 m per detik
    Demikian seterusnya, setiap 10 detik berikutnya
    kecepatannya bertambah dengan 0.1 m per detik.

    Satu menit kemudian, yaitu pukul 08: 01 : 00,
    Badu berangkat juga dari titik A ke titik B, menysul Ali
    dengan kecepatan tetap, 3 m per detik.

    Susun program untuk mencetak pukul berapa
    ( Jam : Menit : Detik ) Badu dapat mendahului Ali
    `);
    console.log("-----------------------------------------------------------");
    console.log("2. Soal 2");
    console.log(`
    Jarak titik A dan titik B 1000 m.
    Ali berangkat dari titik A ke titik B pukul 8 tepat ( 08:00:00 )
    dengan kecepatan sebagai berikut :
      - Pada detik ke-1 kecepatannya 2 m per detik.
      - Pada detik ke-2 kecepatannya 2.1 m per detik
      - Pada detik ke-3 kecepatannya 2.2 m per detik
    Demikian seterusnya setiap detik berikutnya kecepatannya
    selalu betmabah 0.1 m per detik.
    
    Badu berangkat dari titik B ke titik A pukul 8 lewat 10 detik
    (08:00:10 ) dengan kecepatan 3 m per detik.
    
    Susun program untuk mencetak pada detik keberapa setelah
    pukul 8 Ali dan Badu berpapasan di jalan.
    
    Juga mencetak jarak Badu dengan titik B setelah detik mereka
    berpapasan. 
    `);
    console.log("-----------------------------------------------------------");
    rl.question("Masukkan pilihan (1/2): ", (choice) => {
        if (choice === '1') {
            soal1();
        } else if (choice === '2') {
            soal2();
        } else {
            console.log("Pilihan tidak valid.");
            showMenu();
        }
    });
}

showMenu();
