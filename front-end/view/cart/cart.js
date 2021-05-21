document.getElementById('cart')
        .innerHTML += `<form>
                                <div>
                                    <div class = "full-name">
                                        <div >
                                            <label for="firstName">Prénom</label>
                                            <input type="text" id="firstName" placeholder="Prénom" required>
                                        </div>
                                        <div >
                                            <label for="lastName">Nom</label>
                                            <input type="text" id="lastName" placeholder="Nom" required>
                                        </div>
                                    </div>
                                    <div id="address" class = "full-adress">
                                        <div>
                                            <label for="delivery-address">Adresse</label>
                                            <input type="text" placeholder="Adresse"
                                        required>
                                            <input type="text" placeholder="Complément d'adresse">
                                        </div>
                                        <div>
                                            <label for="postal-code">Code Postal</label>
                                            <input type="text" placeholder="Code Postal"
                                        required>
                                        </div>
                                        <div>
                                            <label for="city">Ville</label>
                                            <input type="text" id="city" placeholder="Ville" required>
                                        </div>
                                    </div>
                                    <div class = "customer-contact">
                                        <div>
                                            <label for="email">Email</label>
                                            <input type="email" id="email" placeholder="prenom.nom@mail.com"
                                            required>
                                            <span class="error" aria-live="polite"></span>
                                        </div>
                                        <div>
                                            <label for="phone">Numéro de téléphone</label>
                                            <input type="phone" id="phone" placeholder="06.00.01.02.03"
                                            required>
                                            <span class="error" aria-live="polite"></span>
                                        </div>
                                    </div>
                                </div>
                                <button>
                                Commander
                                </button>
                            </form>`;