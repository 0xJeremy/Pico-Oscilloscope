#include "source.h"

static int convert(int freq){
    int max_hz = 1000000;
    int result = (max_hz/freq);
    return result;
}

int main(){
    reading_config = false;
    // set_sys_clock_khz(270000, true);
    stdio_init_all();
    stdio_flush();
    adc_init();
    // Make sure GPIO is high-impedance, no pullups etc
    adc_gpio_init(26);
    adc_gpio_init(27);
    adc_gpio_init(28);
    adc_gpio_init(29);


    sys_config.freq = 1;
    sys_config.period = convert(sys_config.freq);
    multicore_launch_core1(get_config);
    uint64_t t;
    sleep_ms(100);
    while (1) {
        t = time_us_64();
        if(t % sys_config.period == 0){
            adc_select_input(ADC_0);
            adc_out[0] = adc_read();
            
            adc_select_input(ADC_1);
            adc_out[1] = adc_read();
            
            adc_select_input(ADC_2);
            adc_out[2] = adc_read();

            adc_select_input(ADC_3);
            adc_out[3] = adc_read();
            printf("%c%c%c%c%c%c%c%c",
                ((char *)adc_out)[0],
                ((char *)adc_out)[1],
                ((char *)adc_out)[2],
                ((char *)adc_out)[3],
                ((char *)adc_out)[4],
                ((char *)adc_out)[5],
                ((char *)adc_out)[6],
                ((char *)adc_out)[7]);
            
        }
    }
}

void get_config(){
    while(1){
        int read_char;
        if ((read_char = config_inc()) != PICO_ERROR_TIMEOUT && reading_config == false){
            reading_config = true;
            uint8_t bread = 1;
            config = 0;
            config |= (read_char);
            while(bread < CONFIG_SIZE && (read_char = config_inc()) != PICO_ERROR_TIMEOUT){
                config |= (read_char << (8*bread++));
            }
            if (bread == CONFIG_SIZE){
                set_config();
            }
            bread = 0;
            reading_config = false;
        }
    }
}

void set_config(){
    sys_config.freq = config;

    if (sys_config.freq < 1)
        sys_config.freq = 1;
    else if (sys_config.freq > MAX_HZ){
        sys_config.freq = MAX_HZ;
    }
    sys_config.period = convert(sys_config.freq);
}

int config_inc(){
    return getchar_timeout_us(0);
}