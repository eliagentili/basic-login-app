const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Campo obbligatorio.'],
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email non valida.');
        }
      },
    },
    username: {
      type: String,
      required: [true, 'Campo obbligatorio.'],
      trim: true,
      lowercase: true,
      minlength: [4, 'Il nome utente è troppo corto.'],
      maxlength: [20, 'Il nome utente è troppo lungo.'],
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: 'amministrazione',
      trim: true,
      lowercase: true,
      enum: ['root', 'admin', 'amministrazione', 'cliente', 'commerciale'],
    },
    active: {
      type: Boolean,
      default: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * La differenza tra userSchema.statics e userSchema.methods
 *
 * entrambe hanno bisogno di una funzione js canonica (no arrow function!)
 * perché utilizzano this come riferimento.
 *
 * .statics: serve a dichiarare metodi appartenenti al model, non alla sua
 *           singola istanza. Sono quindi legati al model User.
 *
 * .methods: serve a dichiarare metodi della singola istanza. Nel nostro
 *           esempio utilizziamo .methods.generateAuthToken e non .statics
 *           perché in .statics non avrei accesso all'id dell'utente non
 *           essendo l'istanza.
 */

userSchema.statics.findByCredentials = async function (username, password) {
  const user = await this.findOne({ username });
  const errorMessage = 'Credenziali non corrette.';

  if (!user) {
    throw new Error(errorMessage);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error(errorMessage);
  }

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  });

  user.tokens = [...user.tokens, { token }];
  await user.save();

  return token;
};

// toJSON viene richiamata automaticamente ogni volta che viene restituito un oggetto
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    try {
      user.password = await bcrypt.hash(user.password, 8);
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
