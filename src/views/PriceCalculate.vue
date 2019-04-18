<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="white">
          <v-card-title>
            <span class="title">Ingrese la información del lote</span>
          </v-card-title>
          <v-container>
            <v-form>
              <v-layout
                :column="$vuetify.breakpoint.mdAndDown"
                :row="!$vuetify.breakpoint.mdAndDown"
              >
                <v-flex xs12 md4>
                  <v-text-field
                    label="Pendiente de inclinación"
                    v-model="pendiente"
                    v-validate.initi="'decimal:3|required'"
                    data-vv-as="Pendiente de inclinación"
                    name="pendiente"
                    :error-messages="errors.collect('pendiente')"
                    required
                  ></v-text-field>
                </v-flex>
                
                <v-flex x1 class="pt-3">
                  <v-btn
                    v-if="lote.num != 0"
                    color="error"
                    v-on:click.native="() => removeLote(lote.num)"
                  >
                    <v-icon dark>delete</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout
                :column="$vuetify.breakpoint.mdAndDown"
                :row="!$vuetify.breakpoint.mdAndDown"
              >
                <v-flex xs12 md4>
                  <v-btn color="success" v-on:click.native="calculate">Calcular</v-btn>
                  <v-btn color="light" v-on:click.native="clean">Limpiar</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
            <v-flex xs12 md4 v-if="showResult">
              <span>{{result}}</span>
            </v-flex>
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
          num: 0,
          coffeeAverage: "",
          pendiente: ""
        }
      ],
      recolectorAverage: "",
      result: "",
      showResult: false
    };
  },
  methods: {
    addLote() {
      this.showResult = false;
      this.result = "";
      this.lotes.push({
        num: this.lotes[this.lotes.length - 1]["num"] + 1,
        coffeeAverage: "",
        pendiente: ""
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
          num: 0,
          coffeeAverage: "",
          pendiente: ""
        }
      ];
      this.recolectorAverage = "";
      this.showResult = false;
      this.result = "";
    },
    calculate() {
      let quantity = 0;
      let increaseForSlope = [3.4, 2.25, 0.0];
      this.$validator.validate().then(valid => {
        if (valid) {
          this.lotes.forEach(lote => {
            quantity +=
              Number(lote.coffeeAverage) /
              (Number(this.recolectorAverage) +
                increaseForSlope[lote.pendiente]);
          });

          this.result = `Necesita ${Math.round(quantity / 40)} personas`;
          this.showResult = true;
        }
      });
    }
  }
};
</script>

