//tests/<App_Name>.ts

const anchor = require('@project-serum/anchor');
const { assert } = require('chai');
const {SystemProgram} = anchor.web3

describe('postfeedapp', () => {
  const provider = anchor.Provider.local();
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.Postfeedapp;
  const feedPostApp = anchor.web3.Keypair.generate();
  it('Is initialized!', async () => {
    const num = new anchor.BN(2)
    // Add your test here.
    await program.rpc.createPost('hello','www.imagrurl.com',num,false,{
      accounts:{
        feedPostApp:feedPostApp.publicKey,
        user:provider.wallet.publicKey,
        systemProgram:SystemProgram.programId
      },
     signers:[feedPostApp]
    })
    const account = await program.account.feedPostApp.fetch(feedPostApp.publicKey) //get the accounts info from this fetch
    //const tx = await program.rpc.initialize(); 
    //console.log("Your transaction signature", tx);
    assert.ok(account.media === 'www.imagrurl.com');
    assert.ok(account.admin===false);
    assert.ok(account.text==='hello');
    assert.ok(account.position === num);
  });
});

//Provider - Its the abstraction for the connnection for solana network
//Program - Its the abstraction will calls the solana program