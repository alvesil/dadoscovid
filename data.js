var myVar;
        // Create our number formatter.
        var formatter = new Intl.NumberFormat('pt-BR', {
            style: 'decimal'
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });
        function showTime() {
            var d = new Date();
            var t = d.toLocaleTimeString();
            $("#demo").html(t); // display time on the page
        }
        function ajaxFunction() {
            $.ajax({
                url: "https://api.covid19api.com/summary",
                method: "GET",
                success: function (data) {
                    console.log(data);
                    var total = data.Global.TotalConfirmed;
                    var totalDeath = data.Global.TotalDeaths;
                    var totalRecovered = data.Global.TotalRecovered;
                    $("#total").html(formatter.format(total));
                    $("#totalDeath").html(formatter.format(totalDeath));
                    $("#totalRecovered").html(formatter.format(totalRecovered));

                    var date = data.Date;
                    var dateD = "";
                    var dateM = "";
                    var dateA = "";

                    var dateH = "";
                    var dateI = "";
                    var dateS = "";

                    for (let i = 0; i < 4; i++) {
                        dateA += date[i];
                    }
                    for (let i = 5; i <= 6; i++) {
                        dateM += date[i];
                    }
                    for (let i = 8; i <= 9; i++) {
                        dateD += date[i];
                    }

                    for (let i = 11; i <= 12; i++) {
                        dateH += date[i];
                    }
                    for (let i = 14; i <= 15; i++) {
                        dateI += date[i];
                    }
                    for (let i = 17; i <= 18; i++) {
                        dateS += date[i];
                    }

                    for (let i = 0; i < data.Countries.length; i++) {
                        var country = data.Countries[i].Country;
                        var countryTotal = data.Countries[i].TotalConfirmed;
                        var countryDeath = data.Countries[i].TotalDeaths;
                        var countryRecovered = data.Countries[i].TotalRecovered;
                        $("#countries").append(
                            "<div class='col-md-4'>" +
                            "<div class='card'>" +
                            "<div class='card-body'>" +
                            "<h5 class='card-title'>" + country + "</h5>" +
                            "<p class='card-text'>Total de casos: <b class='text-primary'>" + formatter.format(countryTotal) + "</b></p>" +
                            "<p class='card-text'>Total de mortes: <b id='tDPC'class='text-danger'>" + formatter.format(countryDeath) + "</b></p>" +
                            "<p class='card-text'>Total de recuperados: <b class='text-success'>" + formatter.format(countryRecovered) + "</b></p>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                        );
                    }
                    

                   //console.log(dateD + "/" + dateM + "/" + dateA);

                    $("#lastUpdate").html("Atualizado em: " + dateD + "/" + dateM + "/" + dateA + " às " + dateH + ":" + dateI + ":" + dateS);
                }
            });
        }
        function stopFunction() {
            clearInterval(myVar); // stop the timer
        }
        $(document).ready(function () {
            myVar = setInterval("showTime()", 1000);
            ajaxFunction();
            $("#pesquisa").on('keyup', function () {
                var value = $(this).val().toLowerCase();
                $("#countries").find("div").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                });
            });
        });