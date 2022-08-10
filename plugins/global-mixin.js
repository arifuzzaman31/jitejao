import Vue from 'vue'
import Swal from 'sweetalert2';
// window.Swal = Swal;

Vue.mixin({
    methods: {
        replaceNumbersE2B(number) {
            var numbersE = {
                0: '০',
                1: '১',
                2: '২',
                3: '৩',
                4: '৪',
                5: '৫',
                6: '৬',
                7: '৭',
                8: '৮',
                9: '৯'
            };
            var input = number.toString();
            var output = [];
            for (var i = 0; i < input.length; ++i) {
                if (numbersE.hasOwnProperty(input[i])) {
                    output.push(numbersE[input[i]]);
                } else {
                    output.push(input[i]);
                }
            }
            return output.join('');
        },

        limitTitle(str, length, ending) {
            if (length == null) {
                length = 60;
            }
            if (ending == null) {
                ending = '...';
            }
            if (str.length > length) {
                return str.substring(0, length - ending.length) + ending;
            } else {
                return str;
            }
        },
        toastMessage(data) {

            const Toast = Swal.mixin({
                // toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: data.status,
                title: data.message
            })
        },

        modalMessage(data = {}) {
            // this.playSound(base_url + 'audio/error.mp3');
            Swal.fire({
                icon: data.status ? data.status : 'error',
                // title: '',
                text: data.message ? data.message : 'Please Fill Form Correctly',
            });
        },
        ymdDate() {
            var today = new Date();
            var dd = today.getDate();

            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = "0" + dd;
            }

            if (mm < 10) {
                mm = "0" + mm;
            }
            today = yyyy + "-" + mm + "-" + dd;
            return today;
        }

    }

})