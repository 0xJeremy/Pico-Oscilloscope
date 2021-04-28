#include "source.h"

int main(){
    reading_config = false;
    set_sys_clock_khz(270000, true);
    stdio_init_all();
    stdio_flush();
    adc_init();
    // Make sure GPIO is high-impedance, no pullups etc
    adc_gpio_init(26);
    adc_gpio_init(27);
    adc_gpio_init(28);
    adc_gpio_init(29);


    sys_config.freq = 1;
    int32_t delay = HZ_2_DELAY(sys_config.freq);
    add_repeating_timer_us(delay, ADC_Read_Callback, NULL, &read_adc_timer);

    multicore_launch_core1(get_config);
    while (1) {
        tight_loop_contents();
    }
}

void get_config(){
    while(1){
        int read_char;
        if ((read_char = config_inc()) != PICO_ERROR_TIMEOUT){
            reading_config = true;
            uint8_t bread = 1;
            config[0] = read_char;
            while(bread < 8 && (read_char = config_inc()) != PICO_ERROR_TIMEOUT){
                config[bread++] = read_char;
            }
            if (bread == CONFIG_SIZE){
                set_config();
            }
            memset(config, 0, CONFIG_SIZE);
            reading_config = false;
        }
    }
}

void set_config(){
    cancel_repeating_timer(&read_adc_timer);

    struct config_t temp_config = *((struct config_t *)config);
    sys_config.c1_toggle = temp_config.c1_toggle;
    sys_config.c2_toggle = temp_config.c2_toggle;
    sys_config.c3_toggle = temp_config.c3_toggle;
    sys_config.c4_toggle = temp_config.c4_toggle;
    sys_config.freq = temp_config.freq;

    
    if (sys_config.freq < 1)
        sys_config.freq = 1;
    else if (sys_config.freq > MAX_HZ){
        sys_config.freq = MAX_HZ;
    }
    // printf("Toggle %u, %u, %u, %u, Freq = %u\n", 
    //     sys_config.c1_toggle, sys_config.c2_toggle, sys_config.c3_toggle, sys_config.c4_toggle, sys_config.freq);
    int32_t delay = HZ_2_DELAY(sys_config.freq);
    add_repeating_timer_us(delay, ADC_Read_Callback, NULL, &read_adc_timer);
}

int config_inc(){
    return getchar_timeout_us(0);
}


bool ADC_Read_Callback(struct repeating_timer *t) {
    if (reading_config){
        return true;
    }
    adc_select_input(ADC_0);
    adc_out[0] = adc_read();

    adc_select_input(ADC_1);
    adc_out[1] = adc_read();
    
    adc_select_input(ADC_2);
    adc_out[2] = adc_read();

    adc_select_input(ADC_3);
    adc_out[3] = adc_read();
    fwrite(adc_out, 1, 10, stdout);
    return true;
}