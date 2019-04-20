<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap v-if="showResult">
      <v-flex xs12>
        <v-card color="white">
          <v-card-title>
            <span class="title">Calcule el precio de una semana de recolección</span>
          </v-card-title>
          <v-container fill-height>
            <v-form>
              <div v-for="lote in lotes" :key="lote.num">
                <v-layout
                  :column="$vuetify.breakpoint.mdAndDown"
                  :row="!$vuetify.breakpoint.mdAndDown"
                  align-center
                >
                  <v-flex xs12 md4>
                    <p class="title text-md-center">{{`Lote ${lote.num}`}}</p>
                  </v-flex>
                  <v-flex xs12 md12>
                    <v-text-field
                      label="Precio del kilogramo de café recolectado"
                      v-model="lotes[lotes.indexOf(lote)]['priceKg']"
                      disabled
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md12>
                    <v-text-field
                      label="Cantidad de café maduro"
                      v-model="lotes[lotes.indexOf(lote)]['coffeeAmountKgs']"
                      v-validate.initi="'numeric|required'"
                      data-vv-as="Cantidad de café maduro"
                      :name="'lote'+lote.num"
                      :error-messages="errors.collect('lote'+lote.num)"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </div>
              <v-layout
                :column="$vuetify.breakpoint.mdAndDown"
                :row="!$vuetify.breakpoint.mdAndDown"
              >
                <v-flex xs12 md12>
                  <v-btn color="success" v-on:click.native="calculatePricePerWeek">Calcular</v-btn>
                  <v-btn color="light" v-on:click.native="clean">Limpiar</v-btn>
                </v-flex>
                <v-flex xs12 md12 v-if="showPriceWeek">
                  <span>El precio semanal es ${{ priceWeek }}</span>
                </v-flex>
              </v-layout>
            </v-form>
            
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!showResult">
      <v-flex xs12>
        <v-card color="white">
          <v-card-title>
            <span class="title">Ingrese la información de los lotes</span>
          </v-card-title>
          <v-container>
            <v-form>
              <div v-for="lote in lotes" :key="lote.num">
                <v-layout
                  :column="$vuetify.breakpoint.mdAndDown"
                  :row="!$vuetify.breakpoint.mdAndDown"
                >
                  <v-flex xs12 md4>
                    <v-text-field
                      label="Altura promedio de los arboles"
                      v-model="lotes[lotes.indexOf(lote)]['heightTreeAverage']"
                      v-validate.initi="'decimal:3|required'"
                      data-vv-as="Altura promedio de los arboles"
                      :name="'lote'+lote.num"
                      :error-messages="errors.collect('lote'+lote.num)"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-radio-group
                      label="Cantidad de café maduro"
                      v-validate="'required'"
                      :name="'coffeeAmount'+lote.num"
                      data-vv-as="Cantidad de café maduro"
                      v-model="lotes[lotes.indexOf(lote)]['coffeeAmount']"
                      :error-messages="errors.collect('coffeeAmount'+lote.num)"
                    >
                      <v-radio label="Buena" :value="3"></v-radio>
                      <v-radio label="Regular" :value="2"></v-radio>
                      <v-radio label="Mala" :value="1"></v-radio>
                      <v-radio label="Muy mala" :value="0"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-checkbox
                      v-model="lote.distanceGreaterToThousand"
                      label="Distancia del lote al centro de acopio mayor a 1000"
                    />
                  </v-flex>
                  <v-flex x1 class="pt-3">
                    <v-btn
                      v-if="lote.num != 1"
                      color="error"
                      v-on:click.native="() => removeLote(lote.num)"
                    >
                      <v-icon dark>delete</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </div>

              <v-layout
                :column="$vuetify.breakpoint.mdAndDown"
                :row="!$vuetify.breakpoint.mdAndDown"
              >
                <v-flex xs12 md4>
                  <v-btn color="warning" v-on:click.native="addLote">
                    Añadir lote
                    <v-icon dark right>add</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout
                :column="$vuetify.breakpoint.mdAndDown"
                :row="!$vuetify.breakpoint.mdAndDown"
              >
                <v-flex xs12 md4>
                  <v-text-field
                    label="Precio promedio que las fincas vecinas pagan po un kg recolectado"
                    v-model="priceAverage"
                    v-validate.initi="'decimal:3|required'"
                    data-vv-as="Precio promedio que las fincas vecinas pagan po un kg recolectado"
                    name="priceAverage"
                    :error-messages="errors.collect('priceAverage')"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout
                :column="$vuetify.breakpoint.mdAndDown"
                :row="!$vuetify.breakpoint.mdAndDown"
              >
                <v-flex xs12 md12>
                  <v-btn
                    color="success"
                    v-on:click.native="calculatePricePerKg"
                  >Calcular</v-btn>
                  <v-btn color="light" v-on:click.native="clean">Limpiar</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "PriceCalculate",
  data: () => {
    return {
      lotes: [
        {
          num: 1,
          heightTreeAverage: "",
          coffeeAmount: "",
          coffeeAmountKgs: "",
          distanceGreaterToThousand: false,
          priceKg: ""
        }
      ],
      priceAverage: "",
      showResult: false,
      result: "",
      priceWeek: 0,
      showPriceWeek: false
    };
  },
  methods: {
    addLote() {
      this.showResult = false;
      this.result = "";
      this.lotes.push({
        num: this.lotes[this.lotes.length - 1]["num"] + 1,
        heightTreeAverage: "",
        coffeeAmount: "",
        coffeeAmountKgs: "",
        distanceGreaterToThousand: false,
        priceKg: ""
      });
    },
    removeLote(num) {
      this.showResult = false;
      this.result = "";
      this.lotes = this.lotes.filter(item => item.num != num);
    },
    clean() {
      this.lotes = [
        {
          num: 1,
          heightTreeAverage: "",
          coffeeAmount: "",
          coffeeAmountKgs: "",
          distanceGreaterToThousand: false,
          priceKg: ""
        }
      ];
      this.priceAverage = "";
      this.showResult = false;
      this.result = "";
      this.priceWeek = 0;
      this.showPriceWeek = false;
    },
    generateRandomInteger(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    calculatePricePerKg() {
      let increaseForCoffeeAmount = [
        () => this.generateRandomInteger(60, 120),
        () => this.generateRandomInteger(40, 50),
        () => this.generateRandomInteger(10, 20),
        () => 0
      ];
      this.$validator.validate().then(valid => {
        if (valid) {
          this.lotes.forEach(lote => {
            let price = 500;
            if (Number(lote.heightTreeAverage) > 1.7) {
              price += 50;
            }

            price +=
              450 + 450 * (increaseForCoffeeAmount[lote.coffeeAmount]() / 100);
            if (lote.distanceGreaterToThousand) {
              price += 100;
            }
            lote.priceKg = price;
          });
          this.showResult = true;
        }
      });
    },
    calculatePricePerWeek() {
      this.priceWeek = 0;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.lotes.forEach(lote => {
            this.priceWeek += Number(lote.priceKg) * Number(lote.coffeeAmountKgs);
          });
          this.showPriceWeek = true;
        }
      });
    }
  }
};
</script>
